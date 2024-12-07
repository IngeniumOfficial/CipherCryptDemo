import { Ref, createEffect, createSignal, onMount, For } from "solid-js";
import type { Component } from "solid-js";
// @ts-ignore
import anime from "animejs";
// @ts-ignore
import * as d3 from "d3";

const DecryptionAnimation: Component<{
  encryptedData: any;
  decryptedData: any;
  DecAnimation: () => any;
  dataSignal: () => any;
}> = (props) => {
  createEffect(() => {
    console.log("Start Animation?: ", props.DecAnimation());
    if (props.DecAnimation()) toggleAnimations();
  });

  let decUnJSON: any;
  createEffect(() => {
    console.log("data received: ", props.decryptedData());
  });

  const toggleAnimations = () => {
    console.log("Toggle animations Started");
    Array.from(document.getElementsByClassName("decryption-toAnimate")).forEach(
      function (element: any) {
        element.style.display = "block";
      }
    );

    anime({
      targets: ".decryption-toAnimate",
      opacity: 1,
      duration: 300,
      translateY: "50px",
      easing: "cubicBezier(.5, .05, .1, .3)",
      delay: anime.stagger(1200, { start: 500 }),
    }).finished.then(() => {
      console.log("Animation complete for Decryption Animation");
      anime({
        targets: [
          ".loader",
          "#display-nonce",
          "#display-salt",
          "#display-json",
        ],
        opacity: 0,
        translateY: "-100px",
        duration: 300,
        easing: "cubicBezier(.5, .05, .1, .3)",
      }).finished.then(() => {
        (document.querySelector(".loader") as HTMLElement)!.style.display =
          "none";
        (document.querySelector(
          "#display-nonce"
        ) as HTMLElement)!.style.display = "none";
        (document.querySelector(
          "#display-salt"
        ) as HTMLElement)!.style.display = "none";
        (document.querySelector(
          "#display-json"
        ) as HTMLElement)!.style.display = "none";
      });
    });
  };

  return (
    <div id="decryption-animation">
      <div class="loader">
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
      </div>
      <div class="decryption-toAnimate" id="display-ciphertext">
        <h3>Ciphertext Sent</h3>
        <p class="card1">{props.decryptedData().inputCiphertext}</p>
      </div>
      <div class="decryption-toAnimate" id="display-nonce">
        <h3>Nonce Derived from Ciphertext</h3>
        <p class="card1">{props.decryptedData().nonce}</p>
      </div>
      <div class="decryption-toAnimate" id="display-salt">
        <h3>Salt Used to Recreate Key Block</h3>
        <p class="card1">{props.decryptedData().inputSalt}</p>
        <p class="card1">{props.decryptedData().keyhash}</p>
      </div>
      <div class="decryption-toAnimate" id="display-json">
        <h3>Plaintext Obtained as JSON</h3>
        <p class="card1" id="plaintext-json">
          {JSON.stringify(props.decryptedData().unjsoned, null, 2)}
        </p>
      </div>
      <div class="decryption-toAnimate" id="display-plaintext">
        <div id="button-container">
          <button class="success" onClick={() => window.location.reload()}>
            Return to Demo Main
          </button>
          <button class="warning">Confused about the Demo?</button>
          <button class="success">Show me the Code</button>
        </div>
        This is the plaintext:
        <div id="plaintext-container">
          <For each={props.decryptedData().unjsoned}>
            {(item: any) => (
              <p class="card2">
                Username: <ins>{item.username}</ins>
                <br />
                Password: <ins>{item.password}</ins>
                <br />
                Notes: <ins>{item.notes}</ins>
                <br />
              </p>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default DecryptionAnimation;
