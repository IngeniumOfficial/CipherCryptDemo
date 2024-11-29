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
import {
  replaceLS,
  reloadLS,
  updateLS,
  checkLS,
} from "~/components/Demo/utils_ls";
import { dataFilter } from "~/components/Demo/utils_data";
import UnencryptedEmpty from "~/components/Demo/UnencryptedEmpty";
import UnencryptedProgress from "~/components/Demo/UnencryptedProgress";
import UnencryptedGood from "~/components/Demo/UnencryptedGood";
import EditModal from "~/components/Demo/EditModal";

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
    runDisplay(200); // On mount, check localstorage for saved data and display it
  });

  const URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  let localEncrypted: string[] = [];

  /* Run the display function */
  const runDisplay = (time: number = 200) => {
    console.log("Running display");
    let lsRes = checkLS();
    if (lsRes === "progress") {
      loadingSet("progress");
    } else if (lsRes === "empty") {
      loadingSet("empty");
    } else {
      loadingSet("good");
    }

    // Otherwise, display the data incrementally
    for (let key in lsRes) {
      setTimeout(
        () => {
          if (dataSignal().length > 0) {
            dataSignalSet((prev) => [...prev, lsRes[key]]);
          } else {
            dataSignalSet([lsRes[key]]);
          }
        },
        parseInt(key) * time
      );
    }
  };

  const updateWhenRecovering = () => {
    let reload = reloadLS();
    if (reload === "empty") {
      loadingSet("empty");
    }
  };

  /* Add data to the dataSignal array */
  const addData = (dataType: string, data: PasswordData) => {
    let dataRes = dataFilter(dataType, data, dataSignal());
    switch (dataRes) {
      case 400:
        alert("Invalid data type");
        break;
      case 401:
        alert("Maximum number of entries reached");
        break;
      case 409:
        alert("An entry already exists with this username");
        break;
      case 202: {
        dataSignalSet([
          {
            username: data.username,
            password: data.password,
            notes: data.notes,
          },
        ]);
        break;
      }
      case 200: {
        dataSignalSet((prev) => [
          ...prev,
          {
            username: data.username,
            password: data.password,
            notes: data.notes,
          },
        ]);
        break;
      }
    }

    updateLS(dataSignal());
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

    updateLS(dataSignal());
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

  const activateEncryption = () => {
    // Check if keytext or dataStore is empty
    if (dataSignal().length === 0) {
      alert("Cannot encrypt without any data");
    } else if (keytext().length === 0 || keytext() === "") {
      alert("Cannot encrypt without a key");
    } else {
      loadingSet("progress");
      replaceLS(dataSignal());
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
    console.log(`Fetching from: ${URL}`);
    let result = await fetch(`${URL}/encrypt`, {
      method: "POST",
      body: body,
    })
      .then((res) => res.json())
      .then((jsonResult) => {
        console.log("JSON Result is: ", jsonResult);

        encryptedDataSet([
          `Creating a Salt...\n ${jsonResult.salt} \n ${jsonResult.salt_unreliable} \n`,
          `Creating a Key Hash from key ${keytext()}...\n ${jsonResult.keyhash} \n ${jsonResult.keyhash_unreliable} \n`,
          `Creating a Cipher Block of size ${jsonResult.cipherBlockSize} with the Key Hash...\n`,
          `Creating a Nonce...\n ${jsonResult.nonce} \n ${jsonResult.nonce_unreliable} \n`,
          `Encrypting Data with Cipher Block and Nonce...\n ${jsonResult.ciphertext}\n ${jsonResult.ciphertext_unreliable}\n Ciphertext Complete!`,
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

  let innerMain: any;
  let overlayRef: any;
  let modalRef: any;

  return (
    <main>
      <NavBar />
      <DemoToolBar
        dataSignal={dataSignal}
        dataSignalSet={dataSignalSet}
        loadingSet={loadingSet}
      />
      <div id="inner-main" ref={innerMain}>
        <div id="unencrypted" ref={unencryptedRef}>
          <Switch>
            <Match when={loading() === "loading"}>
              <h1>Loading...</h1>
            </Match>
            <Match when={loading() === "empty"}>
              <UnencryptedEmpty addData={addData} />
            </Match>
            <Match when={loading() === "progress"}>
              <UnencryptedProgress
                addData={addData}
                updateWhenRecovering={updateWhenRecovering}
              />
            </Match>
            <Match when={loading() === "good"}>
              <UnencryptedGood
                addData={addData}
                dataSignal={dataSignal}
                deleteData={deleteData}
                editDataTrigger={editDataTrigger}
              />
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
          </div>
          <EditModal
            modalData={modalData}
            dataSignal={dataSignal}
            dataSignalSet={dataSignalSet}
          />
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

export default Demo;
