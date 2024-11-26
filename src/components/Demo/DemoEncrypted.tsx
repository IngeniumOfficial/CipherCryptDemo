import { createSignal, onMount, Ref, createEffect } from "solid-js";
import type { Accessor, Component } from "solid-js";
import Typed from "typed.js";

interface PasswordData {
  username: string;
  password: string;
  notes: string;
}

const DemoEncrypted: Component<{
  encryptedRef: any;
  encryptedData: () => any;
  encryptedDataSet: (data: any) => void;
  triggerDecrypt: () => void;
  encrypt: Accessor<boolean>;
}> = (props) => {
  let encryptedDataRef: any;

  createEffect(() => {
    console.log(`Encrypt? `, props.encrypt());
    if (props.encrypt() === true) {
      setTimeout(() => {
        const typed = new Typed(encryptedDataRef, {
          strings: props.encryptedData(),
          typeSpeed: 0,
          backDelay: 0,
          backSpeed: 0,
        });
      }, 1000);
    }
  });

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
      <h3 id="encryption-guide">{props.encryptedData().description}</h3>
      <div class="scroll-container">
        {/* <p id="encrypted-data">{props.encryptedData().data}</p> */}
        <p id="encrypted-data" ref={encryptedDataRef}></p>
      </div>
      <div id="postencrypt-buttons">
        <button id="return">Return</button>
        <button
          class="success"
          id="decrypt-question"
          onClick={() => props.triggerDecrypt()}
        >
          Decrypt?
        </button>
      </div>
    </div>
  );
};

export default DemoEncrypted;
