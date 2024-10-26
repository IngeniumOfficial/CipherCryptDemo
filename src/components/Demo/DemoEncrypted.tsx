import { createSignal, onMount } from "solid-js";
import type { Component } from 'solid-js'

interface PasswordData{
    username: string;
    password: string;
    notes: string;
}

/* This Component Displays the Stages to Encryption using Visualization */
// Data is changes to JSON
// JSON sent to Server
// Server creates a random salt (a filler value that is used in encryption and decryption)
// Server generates a 32 byte key from the provided keytext, and turns it into bytes
// Server creates a Cipher Block from the key and the salt
// Server generates a nonce (another filler value that is used only once)
// Server encrypts the data with the Cipher Block and the nonce using GCM
// Server sends the encrypted data to the client
const DemoEncrypted: Component<{ plaintext: PasswordData[], keytext: string }> = (props) => {
    const [encryptedData, encryptedDataSet] = createSignal<string>("")
    
    onMount(async () => {

        let body = JSON.stringify({
            key: props.keytext,
            data: props.plaintext
        })

        console.log("Result sent: ", body)
        let result = await fetch("http://localhost:8080/encrypt", {
            method: "POST",
            body: body
        })

        console.log("Result: ", await result)
        console.log("Result JSON", await result.text())
    })

    return(
        <div id="demo-encrypted">
            <pre>Plaintext: {JSON.stringify(props.plaintext, null, 2)}</pre>
        </div>
    )
}

export default DemoEncrypted