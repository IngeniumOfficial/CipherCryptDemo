import { createSignal, onMount, Ref, createEffect } from "solid-js";
import type { Component } from "solid-js";

interface PasswordData {
  username: string;
  password: string;
  notes: string;
}

const DemoEncrypted: Component<{
  encryptedRef: any;
  encryptedData: () => any;
  encryptedDataSet: (data: any) => void;
}> = (props) => {
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
        <div class="scroll-content" id="scroll-content">
          {props.encryptedData().data}
        </div>
      </div>
      <div id="postencrypt-buttons">
        <button id="return">Return</button>
        <button class="success" id="decrypt-question">
          Decrypt?
        </button>
      </div>
    </div>
  );
};

export default DemoEncrypted;
