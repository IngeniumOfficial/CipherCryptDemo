import { Ref } from "solid-js";
import type { Component } from "solid-js";

const DemoDecrypted: Component<{ ciphertext: string; DC: () => any }> = (
  props
) => {
  return (
    <div id="decrypted">
      <div id="ciphertext">{props.ciphertext}</div>
      <div id="decryption-key">
        <input
          type="text"
          id="decryption-key"
          placeholder="Decryption Key that was used to Encrypt"
        />
        <button id="decrypt-button">Decrypt</button>
      </div>
      <h2 id="decrypted-step">{props.DC().description}</h2>
      <div id="decrypted-data">{props.DC().data}</div>
    </div>
  );
};

export default DemoDecrypted;
