import { Ref, createSignal, onMount } from "solid-js";
import type { Component } from "solid-js";

const DecriptionAnimation: Component<{
  encryptedData: any;
  decryptedData: any;
}> = (props) => {
  let enc = props.encryptedData;
  let dec = props.decryptedData;

  if (props.encryptedData.ciphertext === "")
    enc = JSON.parse(localStorage.getItem("encData")!);
  if (props.decryptedData.plaintext === "")
    dec = JSON.parse(localStorage.getItem("decData")!);

  return (
    <div id="decription-animation">
      <div id="encrypted-vis"></div>
      <div id="decrypted-vis"></div>
    </div>
  );
};

export default DecriptionAnimation;
