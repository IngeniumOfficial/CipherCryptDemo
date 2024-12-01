import { createEffect, onMount, Ref } from "solid-js";
import type { Component, Setter } from "solid-js";
import { checkLSForDecrypt } from "~/components/Demo/utils_ls";
import Typewriter from "~/lib/typewriter.ts";
// @ts-ignore
import anime from "animejs";

const DemoDecrypted: Component<{
  encryptedData: any;
  DC: () => any;
  key: () => any;
  keySet: Setter<string>;
}> = (props) => {
  createEffect(() => {
    console.log("Decrypted data changed: ", props.encryptedData());
  });

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

  const decryptFetch = async () => {
    let key = (document.getElementById("decryption-key") as HTMLInputElement)
      .value;
  };

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
      <h3 id="ciphertext">
        {JSON.stringify(props.encryptedData().ciphertext, null, 2)}
      </h3>
      <h3>Please Enter the Decryption Key that you used to Encrypt the Data</h3>
      <div id="decryption-key-section">
        <input
          type="text"
          id="decryption-key"
          placeholder="Decryption Key goes here"
        />
        <button class="success" id="decrypt-button">
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
