package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/pbkdf2"
)

type DecryptData struct {
	Key string `json:"key"`
	Salt string `json:"salt"`
	Ciphertext string `json:"ciphertext"`
}

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

	router.StaticFile("/", "apiIndex.html")

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

		// log.Println("Data: ", requestData)
		// log.Println("Data0: ", requestData.Data[0])

		// log.Println("Data Length: ", requestData.Key)

		/* Key, Salt, and PlainText */
		key := requestData.Key
		saltBytes := make([]byte, 16)
		if _, err := rand.Read(saltBytes); err != nil {
			log.Println("Error with Salt: ", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Salt error": err.Error()})
		}

		keyHash := pbkdf2.Key([]byte(key), saltBytes, 2048, 32, sha256.New)
		// log.Println("Key Hash: ", keyHash)

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

		ciphertextwithoutnonce := gcm.Seal(nil, nonce, dataBytes, nil)
		ciphertext := append(nonce, ciphertextwithoutnonce...)
		// log.Println("Original Ciphertext: ", ciphertextwithoutnonce)
		// log.Println("Original Nonce: ", nonce)
		log.Println("Ciphertext with Nonce: ", ciphertext)

		c.JSON(http.StatusOK, gin.H{
			"inputKey":        key,
			"inputData":       data,
			"salt":            hex.EncodeToString(saltBytes),
			"salt_unreliable": string(saltBytes),
			"keyhash":         hex.EncodeToString(keyHash),
			"keyhash_unreliable":         string(keyHash),
			"cipherBlockSize": block.BlockSize(),
			"nonce":           hex.EncodeToString(nonce),
			"none_unreliable": string(nonce),
			"ciphertext":      hex.EncodeToString(ciphertext),
			"ciphertext_unreliable": string(ciphertext),
		})
	})

	router.POST("/decrypt", func(c *gin.Context) {
		// Cors
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		log.Println("Inside Decrypt")
		var requestData DecryptData
		if err := c.BindJSON(&requestData); err != nil {
			log.Println("Error with BindJSON: ", err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// If either components is missing or empty, return error
		if requestData.Key == "" || requestData.Salt == "" || requestData.Ciphertext == "" {
			log.Println("Missing Key, Salt, or Ciphertext")
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing Key, Salt, or Ciphertext"})
		}

		log.Println("Input ciphertext: ", requestData.Ciphertext)

		// Convert the ciphertext string to byte
		ciphertextBytes, hexDecodeErr := hex.DecodeString(requestData.Ciphertext)
		if hexDecodeErr != nil {
			log.Println("Error with Hex Decode: ", hexDecodeErr.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": hexDecodeErr.Error()})
		}

		log.Println("Input ciphertext bytes: ", ciphertextBytes)
		keyBytes := []byte(requestData.Key)
		saltBytes, _ := hex.DecodeString(requestData.Salt)		

		// Reproduce Key Hash
		keyHash := pbkdf2.Key(keyBytes, saltBytes, 2048, 32, sha256.New)
		if keyHash == nil {
			log.Println("Error with Key Hashing")
			c.JSON(http.StatusInternalServerError, gin.H{"errpr": "Key Hash error"})
		}

		// Create AES Cipher Block from Key Hash
		block, blockErr := aes.NewCipher(keyHash)
		if blockErr != nil {
			log.Println("Error with Block: ", blockErr.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Block error": blockErr.Error()})
		}

		// Create GCM Cipher
		gcm, gcmErr := cipher.NewGCM(block)
		if gcmErr != nil {
			log.Println("Error with GCM: ", gcmErr.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"GCM error": gcmErr.Error()})
		}

		// Extract nonce from ciphertext
		nonceSize := gcm.NonceSize()
		if(len(ciphertextBytes) < nonceSize) {
			log.Println("Error with Nonce Size")
			c.JSON(http.StatusInternalServerError, gin.H{"Nonce error": "Error with Nonce Size"})
		}
		nonce, ciphertext := ciphertextBytes[:nonceSize], ciphertextBytes[nonceSize:]

		log.Println("Extracted Ciphertext: ", ciphertext)
		log.Println("Extracted nonce: ", nonce)

		// Decrypt
		plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
		if err != nil {
			log.Println("Error with Decryption: ", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Decryption error": err.Error()})
		}

		// Convert to JSON and return
		c.JSON(http.StatusOK, gin.H{
			"inputKey":        requestData.Key,
			"inputSalt":       requestData.Salt,
			"inputCiphertext": requestData.Ciphertext,
			"keyhash":         string(keyHash),
			"nonce":           string(nonce),
			"plaintext":       string(plaintext),
		})


	})

	// The following endpoint was for testing
	router.POST("/encryptdecrypt", func(c *gin.Context) {
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
		log.Println("original databytes", dataBytes)

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
		log.Println("original nonce", nonce)

		ciphertextwithoutnonce := gcm.Seal(nil, nonce, dataBytes, nil)
		ciphertext := append(nonce, ciphertextwithoutnonce...)
		log.Println("Ciphertext: ", ciphertext)

		type ResponseData struct {
			Key        string `json:"key"`
			Salt       string `json:"salt"`
			Ciphertext string `json:"ciphertext"`
		}

		rData1 := ResponseData{
			Key:        requestData.Key,
			Salt:       string(saltBytes),
			Ciphertext: string(ciphertext),
		}

		// Convert Everything back and return the decrypted data
		log.Println("Inside Decrypt")

		// Convert the ciphertext string to byte
		ciphertextBytes2 := []byte(rData1.Ciphertext)
		keyBytes2 := []byte(rData1.Key)
		saltBytes2 := []byte(rData1.Salt)		

		// Reproduce Key Hash
		keyHash2 := pbkdf2.Key(keyBytes2, saltBytes2, 2048, 32, sha256.New)
		if keyHash == nil {
			log.Println("Error with Key Hashing")
			c.JSON(http.StatusInternalServerError, gin.H{"errpr": "Key Hash error"})
		}

		// Create AES Cipher Block from Key Hash
		block2, blockErr2 := aes.NewCipher(keyHash2)
		if blockErr2 != nil {
			log.Println("Error with Block: ", blockErr.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Block error": blockErr2.Error()})
		}

		// Create GCM Cipher
		gcm2, gcmErr2 := cipher.NewGCM(block2)
		if gcmErr != nil {
			log.Println("Error with GCM: ", gcmErr2.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"GCM error": gcmErr2.Error()})
		}

		// Extract nonce from ciphertext
		nonceSize2 := gcm2.NonceSize()
		if(len(ciphertextBytes2) < nonceSize2) {
			log.Println("Error with Nonce Size")
			c.JSON(http.StatusInternalServerError, gin.H{"Nonce error": "Error with Nonce Size"})
		}
		nonce2, ciphertext2 := ciphertextBytes2[:nonceSize2], ciphertextBytes2[nonceSize2:]
		log.Println("Extracted Nonce: ", nonce2)
		log.Println("Extracted Ciphertext: ", ciphertext2)

		// Decrypt
		plaintext, err := gcm2.Open(nil, nonce2, ciphertext2, nil)
		if err != nil {
			log.Println("Error with Decryption: ", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"Decryption error": err.Error()})
		}

		// Convert to JSON and return
		c.JSON(http.StatusOK, gin.H{
			"inputKey":        rData1.Key,
			"inputSalt":       rData1.Salt,
			"inputCiphertext": rData1.Ciphertext,
			"keyhash":         string(keyHash),
			"nonce":           string(nonce),
			"plaintext":       string(plaintext),
		})
		
	})

	router.Run()
}
