import { createSignal, Ref } from "solid-js";
import type { Component } from "solid-js";

const UnencryptedEmpty: Component<{
  addData: (type: string, data: any) => void;
}> = (props) => {
  let addUsernameEmpty: any;
  let addPassEmpty: any;
  let addNotesEmpty: any;

  return (
    <>
      <h2>No Data Found. Add Password or Note Below</h2>
      <div class="demo-input">
        <div class="input-section">
          <h3>Username: </h3>
          <input
            ref={addUsernameEmpty}
            class="demo-inputs"
            type="text"
            id="demo-input-username-empty"
          />
        </div>
        <div class="input-section">
          <h3>Password: </h3>
          <input
            ref={addPassEmpty}
            class="demo-inputs"
            type="text"
            id="demo-input-pass-empty"
          />
        </div>
        <div class="input-section">
          <h3>Notes: </h3>
          <input
            ref={addNotesEmpty}
            class="demo-inputs"
            type="text"
            id="demo-input-notes-empty"
          />
        </div>
        <button
          id="demo-input-button"
          onClick={() =>
            props.addData("password", {
              username: addUsernameEmpty.value,
              password: addPassEmpty.value,
              notes: addNotesEmpty.value,
            })
          }
        >
          Add Password
        </button>
      </div>
    </>
  );
};

export default UnencryptedEmpty;
