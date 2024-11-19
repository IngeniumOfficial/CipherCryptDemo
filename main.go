package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/pbkdf2"
)

type RequestData struct {
	Key  string         `json:"key"`
	Data []PasswordData `json:"data"`
}

type PasswordData struct {
	Password string `json:"password"`
	Username string `json:"username"`
	Notes    string `json:"notes"`
}

func main() {
	router := gin.Default()
	// router.Use(cors.Default())

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	router.POST("/encrypt", func(c *gin.Context) {
		// Cors
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		log.Println("Inside Encrypt")
		var requestData RequestData
		if err := c.BindJSON(&requestData); err != nil {
			log.Println("Error with BindJSON: ", err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		log.Println("Data: ", requestData)
		log.Println("Data0: ", requestData.Data[0])

		log.Println("Data Length: ", requestData.Key)

		/* Key, Salt, and PlainText */
		key := requestData.Key
		saltBytes := make([]byte, 16)
		if _, err := rand.Read(saltBytes); err != nil {
			log.Println("Error with Salt: ", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Salt error": err.Error()})
		}

		keyHash := pbkdf2.Key([]byte(key), saltBytes, 2048, 32, sha256.New)
		log.Println("Key Hash: ", keyHash)

		data := requestData.Data
		dataJSON, dataJSONErr := json.Marshal(data)
		if dataJSONErr != nil {
			log.Println("Error with Input Data (JSON): ", dataJSONErr.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": dataJSONErr.Error()})
		}
		dataBytes := []byte(dataJSON)

		// AES Encryption
		block, blockErr := aes.NewCipher(keyHash)
		if blockErr != nil {
			log.Println("Error with Block: ", blockErr.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Block error": blockErr.Error()})
		}

		gcm, gcmErr := cipher.NewGCM(block)
		if gcmErr != nil {
			log.Println("Error with GCM: ", gcmErr.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"GCM error": gcmErr.Error()})
		}

		nonce := make([]byte, gcm.NonceSize())
		if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
			log.Println("Error with Nonce: ", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Nonce error": err.Error()})
		}

		ciphertext := gcm.Seal(nil, nonce, dataBytes, nil)
		log.Println("Ciphertext: ", ciphertext)

		c.JSON(http.StatusOK, gin.H{
			"inputKey":        key,
			"inputData":       data,
			"salt":            string(saltBytes),
			"keyhash":         string(keyHash),
			"cipherBlockSize": block.BlockSize(),
			"nonce":           string(nonce),
			"ciphertext":      string(ciphertext),
		})
	})

	router.POST("/sidebyside", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	router.Run()
}
