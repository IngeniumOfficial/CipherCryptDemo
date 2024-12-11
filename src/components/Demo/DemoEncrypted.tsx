import { createSignal, onMount, Ref, createEffect } from "solid-js";
import type { Accessor, Component } from "solid-js";
import Typed from "typed.js";
// @ts-ignore
import anime from "animejs";
import Typewriter from "~/lib/typewriter.ts";

interface PasswordData {
  username: string;
  password: string;
  notes: string;
}

const DemoEncrypted: Component<{
  encryptedRef: any;
  encryptedData: Accessor<string[]>;
  // encryptedDataSet: (data: any) => void;
  // triggerDecrypt: () => void;
  encrypt: Accessor<boolean>;
}> = (props) => {
  let encryptedDataRef: any;
  let typed: any;

  createEffect(() => {
    console.log(`Encrypt? `, props.encrypt());

    if (props.encrypt() === true) {
      setTimeout(() => {
        let tw = new Typewriter("encrypted-data", {
          strings: props.encryptedData(),
          typeSpeed: 10,
          skipChunkMin: 3,
          skipChunkMax: 5,
          onComplete: () => {
            let banter = document.getElementById("banter-loader");
            anime({
              targets: banter,
              translateY: "-500px",
              opacity: 0,
              duration: 1000,
              easing: "cubicBezier(.5, .05, .1, .3)",
            });
            setTimeout(() => {
              let banter = document.getElementById("banter-loader");
              banter!.style.display = "none";
              document.getElementById("postencrypt-buttons")!.style.display =
                "flex";
            }, 500);
          },
        });
        tw.run();
      }, 1000);
    }
  });

  const toggleDecrypt = () => {
    let encrypted = document.getElementById("encrypted");
    let decrypted = document.getElementById("decrypted");

    anime({
      targets: [
        encrypted,
        ".scroll-container",
        "#encrypted-data",
        "#postencrypt-buttons",
        "#return",
        "#decrypt-question",
      ],
      translateX: "-1000px",
      opacity: 0,
      duration: 1000,
      easing: "cubicBezier(.5, .05, .1, .3)",
    });
    setTimeout(() => {
      encrypted!.style.display = "none";
      decrypted!.style.display = "flex";
      anime({
        targets: decrypted,
        translateX: "-500px",
        opacity: 1,
        duration: 1000,
        easing: "cubicBezier(.5, .05, .1, .3)",
      });
    }, 500);
  };

  return (
    <div id="encrypted" ref={props.encryptedRef}>
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
      {/* <h3 id="encryption-guide">{props.encryptedData.description}</h3> */}
      <div class="scroll-container">
        {/* <p id="encrypted-data">{props.encryptedData().data}</p> */}
        <p id="encrypted-data" ref={encryptedDataRef}></p>
      </div>
      <div id="postencrypt-buttons">
        <button id="return" onClick={() => window.location.reload()}>
          Return
        </button>
        <button
          class="success"
          id="decrypt-question"
          onClick={() => toggleDecrypt()}
        >
          Decrypt?
        </button>
      </div>
    </div>
  );
};

export default DemoEncrypted;
