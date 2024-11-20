import { createSignal, onMount, Ref, createEffect } from "solid-js";
import type { Component } from "solid-js";
import anime from "animejs";

interface PasswordData {
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
const DemoEncrypted: Component<{
  plaintext: PasswordData[];
  keytext: string;
  encryptedRef: any;
  runEncryptionFetch: () => boolean;
}> = (props) => {
  const [encryptedData, encryptedDataSet] = createSignal<any>({
    description: "Converting Data to JSON...",
    data: `Plaintext: ${JSON.stringify(props.plaintext, null, 2)}`,
  });

  onMount(async () => {
    // unfold();

    // setTimeout(() => {
    //   fold();
    // }, 3000);

    let body = JSON.stringify({
      key: props.keytext,
      data: props.plaintext,
    });

    console.log("Result sent: ", body);
    let result = await fetch("http://localhost:8080/encrypt", {
      method: "POST",
      body: body,
    });

    console.log("Result: ", await result);
    let jsonResult = await result.json();

    console.log("JSON Result: ", jsonResult);

    triggerDisplayChain(
      ["Creating a Salt...", jsonResult.salt],
      [`Creating a Key Hash from key ${props.keytext}...`, jsonResult.keyhash],
      [
        `Creating a Cipher Block of size ${jsonResult.cipherBlockSize} with the Key Hash...`,
        jsonResult.keyhash,
      ],
      ["Creating a Nonce...", jsonResult.nonce],
      ["Encrypting Data with Cipher Block and Nonce...", jsonResult.ciphertext],
      ["Below is the Encrypted Data", jsonResult.ciphertext]
    );
  });

  createEffect(() => {
    console.log("Run encryption fetch: ", props.runEncryptionFetch());
  });

  const triggerDisplayChain = (...params: any) => {
    let tempArr = [...params];

    for (let i = 0; i < tempArr.length; i++) {
      setTimeout(() => {
        encryptedDataSet({ description: tempArr[i][0], data: tempArr[i][1] });
        console.log(tempArr[i][0], tempArr[i][1]);
      }, i * 2000);
    }
  };

  const unfold = () => {
    anime({
      targets: document.querySelector(".scroll-container"),
      height: "500px",
      duration: 1000,
      easing: "cubicBezier(.5, .05, .1, .3)",
    });
  };

  const fold = () => {
    anime({
      targets: document.querySelector(".scroll-container"),
      height: "30px",
      duration: 1000,
    });
  };

  return (
    <div id="encrypted" ref={props.encryptedRef}>
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
      <h3 id="encryption-guide">{encryptedData().description}</h3>
      <div class="scroll-container">
        <div class="scroll-content" id="scroll-content">
          {encryptedData().data}
        </div>
      </div>
    </div>
  );
};

export default DemoEncrypted;
