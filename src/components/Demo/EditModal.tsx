import { Ref } from "solid-js";
import type { Component, Setter } from "solid-js";
import { updateLS } from "./utils_ls";

const EditModal: Component<{
  modalData: () => any;
  dataSignal: () => any;
  dataSignalSet: Setter<any>;
}> = (props) => {
  let modalRef: any;
  let overlayRef: any;
  let modalUsernameRef: any;
  let modalPasswordRef: any;
  let modalNotesRef: any;

  const editData = (
    oldUsername: string,
    newUsername: string,
    newPassword: string,
    newNotes: string
  ) => {
    console.log(
      "Editing data",
      oldUsername,
      newUsername,
      newPassword,
      newNotes
    );
    let tempArr = [...props.dataSignal()];
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].username === oldUsername) {
        tempArr[i].username = newUsername;
        tempArr[i].password = newPassword;
        tempArr[i].notes = newNotes;
        break;
      }
    }
    props.dataSignalSet(tempArr);

    updateLS(props.dataSignal());
    window.location.reload();
  };

  return (
    <div
      id="overlay"
      ref={overlayRef}
      onClick={(e) => {
        console.log(e.target);
        if (e.target === overlayRef) {
          modalRef.close();
          overlayRef.style.display = "none";
          overlayRef.style.zIndex = "-1";
        }
      }}
    >
      <dialog ref={modalRef}>
        <div id="title-and-close">
          <h3 id="modal-title">Edit Password</h3>
          <img
            id="close-modal"
            src="/xmark-solid.svg"
            onClick={() => {
              modalRef.close();
              overlayRef.style.display = "none";
              overlayRef.style.zIndex = "-1";
            }}
          />
        </div>
        <div class="editable-data">
          <h3>Username: </h3>
          <h3
            contenteditable={true}
            spellcheck={false}
            class="editable"
            ref={modalUsernameRef}
          >
            {props.modalData().originalUsername}
          </h3>
        </div>
        <div class="editable-data">
          <h3>Password: </h3>
          <h3
            contenteditable={true}
            spellcheck={false}
            class="editable"
            ref={modalPasswordRef}
          >
            {props.modalData().originalPassword}
          </h3>
        </div>
        <div class="editable-data">
          <h3>Notes: </h3>
          <h3
            contenteditable={true}
            spellcheck={false}
            class="editable"
            ref={modalNotesRef}
          >
            {props.modalData().originalNotes}
          </h3>
        </div>
        <button
          class="demo-input-button"
          onClick={() =>
            editData(
              props.modalData().originalUsername,
              modalUsernameRef.innerText,
              modalPasswordRef.innerText,
              modalNotesRef.innerText
            )
          }
        >
          Save
        </button>
      </dialog>
    </div>
  );
};

export default EditModal;
