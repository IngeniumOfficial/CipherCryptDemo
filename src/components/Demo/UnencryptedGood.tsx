import { Index, Ref } from "solid-js";
import type { Component } from "solid-js";

const UnencryptedGood: Component<{
  addData: (type: string, data: any) => void;
  dataSignal: () => any[];
  deleteData: (username: string) => void;
  editDataTrigger: (
    oldUsername: string,
    oldPass: string,
    oldNotes: string
  ) => void;
}> = (props) => {
  let addUsernameGood: any;
  let addPassGood: any;
  let addNotesGood: any;

  return (
    <>
      <button
        class="warning"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Clear Local Storage and Reload
      </button>
      <Index each={props.dataSignal()}>
        {(dataPiece, dataPieceIndex) => (
          <DemoDisplayBlock
            deleteData={props.deleteData}
            username={dataPiece().username}
            password={dataPiece().password}
            notes={dataPiece().notes}
            editDataTrigger={props.editDataTrigger}
          />
        )}
      </Index>
      <div class="demo-input">
        <div class="input-section">
          <h3>Username: </h3>
          <input
            ref={addUsernameGood}
            class="demo-inputs"
            type="text"
            id="demo-input-username-good"
          />
        </div>
        <div class="input-section">
          <h3>Password: </h3>
          <input
            ref={addPassGood}
            class="demo-inputs"
            type="text"
            id="demo-input-pass-good"
          />
        </div>
        <div class="input-section">
          <h3>Notes: </h3>
          <input
            ref={addNotesGood}
            class="demo-inputs"
            type="text"
            id="demo-input-notes-good"
          />
        </div>
        <button
          onClick={() =>
            props.addData("password", {
              username: addUsernameGood.value,
              password: addPassGood.value,
              notes: addNotesGood.value,
            })
          }
        >
          Add Password
        </button>
      </div>
    </>
  );
};

const DemoDisplayBlock: Component<{
  deleteData: (username: string) => void;
  username: string;
  password: string;
  notes: string;
  editDataTrigger: (
    oldUsername: string,
    oldPass: string,
    oldNotes: string
  ) => void;
}> = (props) => {
  return (
    <div class="demo-display-block">
      <div class="username-password">
        <div class="up-left">
          <p>
            Username: <ins>{props.username}</ins>
          </p>
          <p>
            Password: <ins>{props.password}</ins>
          </p>
        </div>
        <img
          src="/trash-solid.svg"
          onClick={() => props.deleteData(props.username)}
        />
      </div>
      <div class="notes-edit">
        <p id="demo-notes">
          Notes: <ins>{props.notes}</ins>
        </p>
        <button
          id="demo-edit-button"
          onClick={() =>
            props.editDataTrigger(props.username, props.password, props.notes)
          }
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default UnencryptedGood;
