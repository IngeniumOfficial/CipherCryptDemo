import {
  createSignal,
  onMount,
  Switch,
  Match,
  For,
  Ref,
  Show,
  Index,
} from "solid-js";
import { createStore } from "solid-js/store";
import type { Component } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import DemoToolBar from "~/components/Demo/DemoToolBar";
import DemoEncrypted from "~/components/Demo/DemoEncrypted";
// @ts-ignore
import anime from "animejs";
import "./Demo.scss";
import { moveLeftAddRight, mLARResult } from "~/components/Demo/utils_anime";

interface PasswordData {
  username: string;
  password: string;
  notes: string;
}

interface locallyStoredData {
  [key: number]: PasswordData;
}

const Demo: Component = () => {
  const [loading, loadingSet] = createSignal("loading");
  const [keytext, keytextSet] = createSignal("");
  const [encrypt, encryptSet] = createSignal<boolean>(false);
  const [dataSignal, dataSignalSet] = createSignal<PasswordData[]>([]); // This is the main data store. Nested reactivity (createStore) was unnecessary. It bases its order on the array system, and stores the order in localstorage the same way
  const [decryptKeyText, decryptKeySetText] = createSignal("");
  const [modalData, modalDataSet] = createSignal<any>({
    originalUsername: "",
    originalPassword: "",
    originalNotes: "",
  });
  const [encryptedData, encryptedDataSet] = createSignal<string[]>([]);

  onMount(() => {
    localStorageAndDisplay(); // On mount, check localstorage for saved data and display it
  });

  const URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  let localEncrypted: string[] = [];

  const localStorageAndDisplay = () => {
    function checkLocalStorage() {
      // Check localstorage for data that was in progress
      if (localStorage.getItem("tempData")) {
        loadingSet("progress");
        return;
      }
      // If there is data in localstorage, display it by calling run display incrementally for effect
      const lsData = localStorage.getItem("demoData");
      if (lsData) {
        const data = JSON.parse(lsData);
        loadingSet("good");
        for (let key in data) {
          runDisplay(data[key], parseInt(key) * 200);
        }
      } else {
        loadingSet("empty");
      }
    }

    function runDisplay(dataPiece: any, time: number) {
      // Run display is bundled with checkLocalStorage since this is its only purpose, to display individual segments of data
      setTimeout(() => {
        if (dataSignal().length > 0) {
          dataSignalSet((prev) => [...prev, dataPiece]);
        } else {
          dataSignalSet([dataPiece]);
        }
      }, time);
    }

    checkLocalStorage();
  };

  const updateLocalStorage = (
    replace: boolean = false,
    reload: boolean = false
  ) => {
    if (replace) {
      // Transfer data to a different object, and empty demoData in localstorage
      const tempData = dataSignal();
      let tempObject: any = {};
      tempData.forEach((item, index) => {
        tempObject[index] = item;
      });
      localStorage.setItem("tempData", JSON.stringify(tempObject));
      localStorage.removeItem("demoData");
      return;
    }

    if (reload) {
      // Transfer data from secondary (tempData) to primary (demoData) and empty tempData
      const tempData = localStorage.getItem("tempData");
      if (tempData) {
        const data = JSON.parse(tempData);
        localStorage.setItem("demoData", JSON.stringify(data));
        localStorage.removeItem("tempData");
        loadingSet("good");
        window.location.reload();
        return;
      } else {
        window.alert(
          "The data might have been corrupted or lost. Please enter new data."
        );
        loadingSet("empty");
        return;
      }
    }

    console.log("Updating Local Storage with data", dataSignal());
    const tempData = dataSignal();
    let tempObject: any = {};
    tempData.forEach((item, index) => {
      tempObject[index] = item;
    });

    localStorage.setItem("demoData", JSON.stringify(tempObject));
  };

  const addData = (dataType: string, data: PasswordData) => {
    if (
      data === undefined ||
      data === null ||
      data.username === "" ||
      data.password === ""
    ) {
      alert("Cannot add empty data");
      return;
    } else {
      if (dataType === "password") {
        // If there is no data in dataStore, create it
        if (dataSignal().length === 0) {
          console.log("No data in dataStore, creating it");
          dataSignalSet([
            {
              username: data.username,
              password: data.password,
              notes: data.notes,
            },
          ]);

          // Also, change loading state to good
          loadingSet("good");
        } else {
          // Otherwise, check for duplicates and add to end of array
          let tempArr = dataSignal();
          let dupCheck = false;
          for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i].username === data.username) {
              dupCheck = true;
              break;
            }
          }

          if (dupCheck) {
            console.log("Duplicate found");
            alert("Cannot add duplicate data");
            return;
          } else {
            dataSignalSet((prev) => [
              ...prev,
              {
                username: data.username,
                password: data.password,
                notes: data.notes,
              },
            ]);
          }
        }
      }
    }

    updateLocalStorage();
  };

  const deleteData = (username: string) => {
    // The data array is duplicated into a temp array, and then the item is deleted by being spliced out of the array
    // The data array is then replaced with the temp array
    let tempArr = [...dataSignal()];
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].username === username) {
        tempArr.splice(i, 1);
        break;
      }
    }
    dataSignalSet(tempArr);
    updateLocalStorage();
  };

  const editDataTrigger = (
    oldUsername: string,
    oldPass: string,
    oldNotes: string
  ) => {
    modalDataSet({
      originalUsername: oldUsername,
      originalPassword: oldPass,
      originalNotes: oldNotes,
    });

    overlayRef.style.display = "flex";
    overlayRef.style.overflow = "hidden";
    overlayRef.style.zIndex = "2";
    modalRef.show();
  };
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
    let tempArr = [...dataSignal()];
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].username === oldUsername) {
        tempArr[i].username = newUsername;
        tempArr[i].password = newPassword;
        tempArr[i].notes = newNotes;
        break;
      }
    }
    dataSignalSet(tempArr);
    updateLocalStorage();
    window.location.reload();
  };

  const activateEncryption = () => {
    // Check if keytext or dataStore is empty
    if (dataSignal().length === 0) {
      alert("Cannot encrypt without any data");
    } else if (keytext().length === 0 || keytext() === "") {
      alert("Cannot encrypt without a key");
    } else {
      loadingSet("progress");
      updateLocalStorage(true, false);
      encryptSet(true);

      moveLeftAddRight("unencrypted", "encrypted").then((res: mLARResult) => {
        if (res.complete) runEncryptFetch();
      });
    }
  };

  let unencryptedRef: any;
  let encryptedRef: any;

  const runEncryptFetch = async () => {
    console.log("Run encryption fetch");

    let body = JSON.stringify({
      key: keytext(),
      data: dataSignal(),
    });

    console.log("Result sent: ", body);
    let result = await fetch(`${URL}/encrypt`, {
      method: "POST",
      body: body,
    })
      .then((res) => res.json())
      .then((jsonResult) => {
        // localEncrypted = [
        //   `Creating a Salt...^500\n ${jsonResult.salt} \n ${jsonResult.salt_unreliable} \n
        //   Creating a Key Hash from key ${keytext()}...^500\n ${jsonResult.keyhash} \n ${jsonResult.keyhash_unreliable} \n
        //   Creating a Cipher Block of size ${jsonResult.cipherBlockSize} with the Key Hash...^500\n
        //   Creating a Nonce...^500\n ${jsonResult.nonce} \n ${jsonResult.nonce_unreliable} \n
        //   Encrypting Data with Cipher Block and Nonce...^500\n ${jsonResult.ciphertext} \n ${jsonResult.ciphertext_unreliable} \n^1000\n Ciphertext Complete!`,
        // ];
        // encryptedDataSet([
        //   `Creating a Salt...^500\n ${jsonResult.salt} \n ${jsonResult.salt_unreliable} \n`,
        // ]);
        encryptedDataSet([
          `Creating a Salt...\n ${jsonResult.salt} \n ${jsonResult.salt_unreliable} \n
          Creating a Key Hash from key ${keytext()}...\n ${jsonResult.keyhash} \n ${jsonResult.keyhash_unreliable} \n
          Creating a Cipher Block of size ${jsonResult.cipherBlockSize} with the Key Hash...\n
          Creating a Nonce...\n ${jsonResult.nonce} \n ${jsonResult.nonce_unreliable} \n
          Encrypting Data with Cipher Block and Nonce...\n ${jsonResult.ciphertext}\n ${jsonResult.ciphertext_unreliable}\n Ciphertext Complete!`,
        ]);
        console.log("Encrypted Data: ", localEncrypted);
        // Set the encrypted data to localstorage
        localStorage.setItem("encData", JSON.stringify(jsonResult));

        let banter = document.getElementById("banter-loader");
        banter!.scrollIntoView({ behavior: "smooth" });
      });
  };

  const triggerDecrypt = () => {
    fetchDecrypt();
  };

  const fetchDecrypt = async () => {
    // Fetch using salt, previous key, and ciphertext
    let ENCData = localStorage.getItem("encData");
    let ed = JSON.parse(ENCData!);
    if (!ENCData) {
      alert(
        "Not data to decrypt. Data might have been corrupted. Please enter new data."
      );
    }

    console.log("Key: ", ed.inputKey);

    let body = JSON.stringify({
      salt: ed.salt,
      key: ed.inputKey,
      ciphertext: ed.ciphertext,
    });

    console.log("Sending the following: ", body);

    let result = await fetch(`${URL}/decrypt`, {
      method: "POST",
      body: body,
    });

    let jsonResult = await result.json();
    console.log("JSON Decrypt Result: ", jsonResult);
  };

  let addPassEmpty: any;
  let addUsernameEmpty: any;
  let addNotesEmpty: any;
  let addUsernameGood: any;
  let addPassGood: any;
  let addNotesGood: any;
  let innerMain: any;
  let overlayRef: any;
  let modalRef: any;
  let modalUsernameRef: any;
  let modalPasswordRef: any;
  let modalNotesRef: any;

  return (
    <main>
      <NavBar />
      <DemoToolBar
        dataSignal={dataSignal}
        dataSignalSet={dataSignalSet}
        updateLS={updateLocalStorage}
        loadingSet={loadingSet}
      />
      <div id="inner-main" ref={innerMain}>
        <div id="unencrypted" ref={unencryptedRef}>
          <Switch>
            <Match when={loading() === "loading"}>
              <h1>Loading...</h1>
            </Match>
            <Match when={loading() === "empty"}>
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
                    addData("password", {
                      username: addUsernameEmpty.value,
                      password: addPassEmpty.value,
                      notes: addNotesEmpty.value,
                    })
                  }
                >
                  Add Password
                </button>
              </div>
            </Match>
            <Match when={loading() === "progress"}>
              <h2>
                Previous Data wasn't decrypted. Add new Data or press the Button
                Below to load previous Data
              </h2>
              <button
                class="warning"
                onClick={() => updateLocalStorage(false, true)}
              >
                Load Previous Data
              </button>
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
                    addData("password", {
                      username: addUsernameEmpty.value,
                      password: addPassEmpty.value,
                      notes: addNotesEmpty.value,
                    })
                  }
                >
                  Add Password
                </button>
              </div>
            </Match>
            <Match when={loading() === "good"}>
              <button
                class="warning"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Clear Local Storage and Reload
              </button>
              <Index each={dataSignal()}>
                {(dataPiece, dataPieceIndex) => (
                  <DemoDisplayBlock
                    deleteData={deleteData}
                    username={dataPiece().username}
                    password={dataPiece().password}
                    notes={dataPiece().notes}
                    editDataTrigger={editDataTrigger}
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
                    addData("password", {
                      username: addUsernameGood.value,
                      password: addPassGood.value,
                      notes: addNotesGood.value,
                    })
                  }
                >
                  Add Password
                </button>
              </div>
            </Match>
          </Switch>
          <div id="encryption-settings">
            <h3>Key: </h3>
            <input
              type="text"
              id="keytext"
              placeholder="Use any word or sentence as Key"
              onChange={(e) => keytextSet(e.currentTarget.value)}
            />
            <button class="error" onClick={() => activateEncryption()}>
              Encrypt the Data
            </button>
            {/* </div> */}
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
                    {modalData().originalUsername}
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
                    {modalData().originalPassword}
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
                    {modalData().originalNotes}
                  </h3>
                </div>
                <button
                  class="demo-input-button"
                  onClick={() =>
                    editData(
                      modalData().originalUsername,
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
          </div>
        </div>
        <DemoEncrypted
          encryptedRef={encryptedRef}
          encryptedData={encryptedData}
          // encryptedDataSet={encryptedDataSet}
          triggerDecrypt={triggerDecrypt}
          encrypt={encrypt}
        />
      </div>
      <Footer />
    </main>
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

export default Demo;
