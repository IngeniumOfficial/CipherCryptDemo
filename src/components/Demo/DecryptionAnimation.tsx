import { Ref, createEffect, createSignal, onMount } from "solid-js";
import type { Component } from "solid-js";
// @ts-ignore
import anime from "animejs";
// @ts-ignore
import * as d3 from "d3";

const DecryptionAnimation: Component<{
  encryptedData: any;
  decryptedData: any;
  DecAnimation: () => any;
}> = (props) => {
  createEffect(() => {
    console.log("Start Animation?: ", props.DecAnimation());
    if (props.DecAnimation()) toggleAnimations();
  });

  const toggleAnimations = () => {
    anime({
      targets: ".decryption-toAnimate",
      opacity: 1,
      duration: 500,
      translateY: "-500px",
    });
  };

  let enc = props.encryptedData;
  let dec = props.decryptedData;

  if (props.encryptedData.ciphertext === "")
    enc = JSON.parse(localStorage.getItem("encData")!);
  if (props.decryptedData.plaintext === "")
    dec = JSON.parse(localStorage.getItem("decData")!);

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
        This is the ciphertext
      </div>
      <div class="decryption-toAnimate" id="display-nonce">
        This is the nonce
      </div>
      <div class="decryption-toAnimate" id="display-salt">
        This is the salt
      </div>
      <div class="decryption-toAnimate" id="display-json">
        This is the json
      </div>
      <div class="decryption-toAnimate" id="display-plaintext">
        This is the plaintext
      </div>
    </div>
  );
};

export default DecryptionAnimation;
