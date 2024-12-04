import { createEffect, onMount, Ref } from "solid-js";
import type { Component, Setter } from "solid-js";
import { checkLSForDecrypt } from "~/components/Demo/utils_ls";
import Typewriter from "~/lib/typewriter.ts";
// @ts-ignore
import anime from "animejs";

const DemoDecrypted: Component<{
  encryptedData: any;
  DC: () => any;
  DCSet: Setter<any>;
  key: () => any;
  keySet: Setter<string>;
}> = (props) => {
  const URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const retrieveKey = () => {
    let ls = checkLSForDecrypt();
    if (ls === "empty") {
      alert(
        "There is no data saved. Either something was tampered with or you're not supposed to be here yet. Reload the page to start over."
      );
      return;
    }

    // Hide the forgot card and button
    anime({
      targets: ["#forgot-card", "#forgot-button"],
      opacity: 0,
      duration: 500,
      // translateY: 500,
      height: 0,
      easing: "cubicBezier(.5, .05, .1, .3)",
    });

    props.keySet(ls.inputKey);
    let tw1 = new Typewriter("decryption-key", {
      strings: [ls.inputKey],
      typeSpeed: 150,
      onComplete: () => {
        console.log("Animation 1 complete");
      },
      outputType: "value",
    });
    tw1.run();
    // (document.getElementById("decryption-key") as HTMLInputElement).value =
    //   ls.inputKey;
  };

  const showForgotCard = () => {
    let fc = document.getElementById("forgot-card");
    fc!.style.display = "flex";
    // fc!.style.opacity = "1";
    anime({
      targets: fc,
      opacity: 1,
      duration: 500,
      // translateY: 500,
      height: 280,
      easing: "cubicBezier(.5, .05, .1, .3)",
    });
    console.log("Show forgot card");
  };

  const fetchDecrypt = async () => {
    // Fetch using salt, previous key, and ciphertext
    let ENCData = props.encryptedData();

    if (ENCData.ciphertext === "") {
      // alert(
      //   "Not data to decrypt. Data might have been corrupted. Please enter new data."
      // );
      // return;

      // TODO: This is temporary. Defer to above when done testing
      ENCData = JSON.parse(localStorage.getItem("encData")!);
    }

    let key1 = props.key();
    console.log("Key to send: ", key1);

    let body = JSON.stringify({
      salt: ENCData.salt,
      key: key1,
      ciphertext: ENCData.ciphertext,
    });

    console.log("Sending the following to Decrypt: ", body);

    let result = await fetch(`${URL}/decrypt`, {
      method: "POST",
      body: body,
    });

    let jsonResult = await result.json();
    // set to local storage
    localStorage.setItem("decData", JSON.stringify(jsonResult));
    props.DCSet(jsonResult);
    console.log("JSON Decrypt Result: ", jsonResult);
  };

  let encryptedDisplay = props.encryptedData();

  if (encryptedDisplay.ciphertext === "") {
    let enc = localStorage.getItem("encData");
    let parsedEnc = JSON.parse(enc!);
    console.log("parsedEnc: ", parsedEnc);
    encryptedDisplay = parsedEnc.ciphertext;
  }

  return (
    <div id="decrypted">
      <div class="banter-loader" id="banter-loader">
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
      <h3>This is the Ciphertext of YOUR data: </h3>
      <p id="ciphertext">{JSON.stringify(encryptedDisplay, null, 2)}</p>
      <h3>Please Enter the Decryption Key that you used to Encrypt the Data</h3>
      <div id="decryption-key-section">
        <input
          type="text"
          id="decryption-key"
          placeholder="Decryption Key goes here"
          onChange={(e) => props.keySet(e.target.value)}
        />
        <button
          class="success"
          id="decrypt-button"
          onClick={() => fetchDecrypt()}
        >
          Decrypt
        </button>
      </div>
      <button id="forgot-button" onClick={() => showForgotCard()}>
        I forgot my decryption key
      </button>
      <div id="forgot-card">
        <p>
          Normally, in a real application, forgetting your key would mean losing
          access to your data.
        </p>
        <p>
          This is the case for nearly all transparent applications in the
          encryption industry.
        </p>
        <p>
          Fortunately for you, this is a demo, and not the real deal. As
          mentioned in the "how this works" section of the demo, the data is
          stored in your browser's local storage.
        </p>
        <p>
          So, while we do not store your data, we can still access it from your
          browser, where we stored it earlier.
        </p>
        <p>Click on the button below to retrieve your key</p>
        <button class="error" id="get-key-button" onClick={() => retrieveKey()}>
          Retrieve Key
        </button>
      </div>
      <h2 id="decrypted-step">{props.DC().description}</h2>
      <div id="decrypted-data">{props.DC().data}</div>
    </div>
  );
};

export default DemoDecrypted;
