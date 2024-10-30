import { createSignal, onMount, Switch, Match, For, Ref, Show, Index } from "solid-js";
import { createStore } from "solid-js/store";
import type { Component } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./Demo.scss"
import DemoToolBar from "~/components/Demo/DemoToolBar";
import DemoEncrypted from "~/components/Demo/DemoEncrypted";

interface PasswordData{
    username: string;
    password: string;
    notes: string;
}

interface locallyStoredData {
    [key: number]: PasswordData
}

const Demo: Component = () => {
    const [loading, loadingSet] = createSignal('loading');
    const [keytext, keytextSet] = createSignal('');
    const [dataSignal, dataSignalSet] = createSignal<PasswordData[]>([]);
    const [encrypt, encryptSet] = createSignal(false);
    const [modalData, modalDataSet] = createSignal<any>({
        originalUsername: '',
        originalPassword: '',
        originalNotes: '',
    })

    onMount(() => {
        checkLocalStorage();
    })

    const checkLocalStorage = () => {
        const lsData = localStorage.getItem("demoData");
        if(lsData) {
            const data = JSON.parse(lsData);
            loadingSet('good');
            for(let key in data) {
                runDisplay(data[key], parseInt(key) * 200);
            }
        } else {
            loadingSet('empty');
        }
    }

    const runDisplay = (dataPiece: any, time: number) => {
        setTimeout(() => {
            if(dataSignal().length > 0) {
                dataSignalSet((prev) => [...prev, dataPiece]);
            } else {
                dataSignalSet([dataPiece]);
            }
        }, time)
    }

    const addData = (dataType: string, data: PasswordData) => {
        if(data === undefined || data === null || data.username === '' || data.password === '') {
            alert("Cannot add empty data");
            return;
        } else {
            if(dataType === 'password') {
                // If there is no data in dataStore, create it
                if(dataSignal().length === 0) {
                    console.log("No data in dataStore, creating it")
                    dataSignalSet([{
                        username: data.username,
                        password: data.password,
                        notes: data.notes
                    }]);
    
                    // Also, change loading state to good
                    loadingSet('good');
                } else {
                    // Otherwise, check for duplicates and add to end of array
                    let tempArr = dataSignal();
                    let dupCheck = false;
                    for(let i = 0; i < tempArr.length; i++) {
                        if(tempArr[i].username === data.username) {
                            dupCheck = true;
                            break;
                        }
                    }

                    if(dupCheck) {
                        console.log("Duplicate found")
                        alert("Cannot add duplicate data");
                        return;
                    } else {
                        dataSignalSet((prev) => [...prev, {
                            username: data.username,
                            password: data.password,
                            notes: data.notes
                        }]);
                    }

                }
            }
        }

        updateLocalStorage();
    }

    const deleteData = (username: string) => {
        let tempArr = [...dataSignal()];
        for(let i = 0; i < tempArr.length; i++) {
            if(tempArr[i].username === username) {
                tempArr.splice(i, 1);
                break;
            }
        }
        dataSignalSet(tempArr);
        updateLocalStorage();
    }

    const editDataTrigger = (oldUsername: string, oldPass: string, oldNotes: string) => {
        modalDataSet({
            originalUsername: oldUsername,
            originalPassword: oldPass,
            originalNotes: oldNotes
        })

        overlayRef.style.display = "block";
        overlayRef.style.overflow = "hidden";
        overlayRef.style.zIndex = "2";
        modalRef.show();


    }
    const editData = (oldUsername: string, newUsername: string, newPassword: string, newNotes: string) => {
        console.log("Editing data", oldUsername, newUsername, newPassword, newNotes)
        let tempArr = [...dataSignal()];
        for(let i = 0; i < tempArr.length; i++) {
            if(tempArr[i].username === oldUsername) {
                tempArr[i].username = newUsername;
                tempArr[i].password = newPassword;
                tempArr[i].notes = newNotes;
                break;
            }
        }
        dataSignalSet(tempArr);
        updateLocalStorage();
        window.location.reload();
    }

    const updateLocalStorage = () => {
        console.log("Updating Local Storage with data", dataSignal())
        const tempData = dataSignal();
        let tempObject: any = {};
        tempData.forEach((item, index) => {
            tempObject[index] = item;
        })

        localStorage.setItem("demoData", JSON.stringify(tempObject));
    }

    const activateEncryption = () => {
        // Check if keytext or dataStore is empty
        if(dataSignal().length === 0) {
            alert("Cannot encrypt without any data");
        } else if(keytext().length === 0 || keytext() === '') {
            alert("Cannot encrypt without a key");
        } else {
            innerMain.style.alignItems = "flex-start";
        }
        encryptSet(true);
    }

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

    return(
        <main>
            <NavBar />
            <DemoToolBar dataSignal={dataSignal} dataSignalSet={dataSignalSet} updateLS={updateLocalStorage} loadingSet={loadingSet} />
            <div id="inner-main" ref={innerMain}>
                {/* <div id="inner-main-plain"> */}
                    <Switch>
                        <Match when={loading() === 'loading'}>
                            <h1>Loading...</h1>
                        </Match>
                        <Match when={loading() === 'empty'}>
                            <div>
                                <h2>No Data Found. Add Password or Note Below</h2>
                                <div class="demo-input">
                                    <div class='input-section'>
                                        <h3>Username: </h3>
                                        <input ref={addUsernameEmpty} class="demo-inputs" type="text" id="demo-input-username-empty" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Password: </h3>
                                        <input ref={addPassEmpty} class="demo-inputs" type="text" id="demo-input-pass-empty" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Notes: </h3>
                                        <input ref={addNotesEmpty} class="demo-inputs" type="text" id="demo-input-notes-empty" />
                                    </div>
                                    <h3 id="demo-input-button" class="demo-input-button" onClick={() => addData('password', {username: addUsernameEmpty.value, password: addPassEmpty.value, notes: addNotesEmpty.value})}>Add Password</h3>
                                </div>
                            </div>
                        </Match>
                        <Match when={loading() === 'good'}>
                            <button class="debug" onClick={() => {localStorage.clear(); window.location.reload();}}>Clear Local Storage and Reload</button>
                            <div id="demo-good">
                                <Index each={dataSignal()}>
                                    {(dataPiece, dataPieceIndex) => (
                                        <DemoDisplayBlock deleteData={deleteData} username={dataPiece().username} password={dataPiece().password} notes={dataPiece().notes} editDataTrigger={editDataTrigger} />
                                    )}
                                </Index>
                                <div class="demo-input">
                                    <div class='input-section'>
                                        <h3>Username: </h3>
                                        <input ref={addUsernameGood} class="demo-inputs" type="text" id="demo-input-username-good" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Password: </h3>
                                        <input ref={addPassGood} class="demo-inputs" type="text" id="demo-input-pass-good" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Notes: </h3>
                                        <input ref={addNotesGood} class="demo-inputs" type="text" id="demo-input-notes-good" />
                                    </div>
                                    <button class="demo-input-button" onClick={() => addData('password', {username: addUsernameGood.value, password: addPassGood.value, notes: addNotesGood.value})}>Add Password</button>
                                </div>
                            </div>
                        </Match>
                    </Switch>
                    <div id="encryption-settings">
                        <h3>Key: </h3>
                        <input type="text" id="keytext" placeholder="Use any word or sentence as Key" onChange={(e) => keytextSet(e.currentTarget.value)} />
                        <button class="demo-input-button" onClick={() => activateEncryption()}>Encrypt the Data</button>
                    {/* </div> */}
                    <div id="overlay" ref={overlayRef} onClick={(e) => {console.log(e.target); if(e.target === overlayRef) {modalRef.close(); overlayRef.style.display = "none"; overlayRef.style.zIndex = "-1";}}}>
                        <dialog ref={modalRef} >
                            <div id="title-and-close">
                                <h3 id="modal-title">Edit Password</h3>
                                <img id="close-modal" src="/xmark-solid.svg" onClick={() => {modalRef.close(); overlayRef.style.display = "none"; overlayRef.style.zIndex = "-1";}} />
                            </div>
                            <div class="editable-data">
                                <h3>Username: </h3>
                                <h3 contenteditable={true} spellcheck={false} class="editable" ref={modalUsernameRef} >{modalData().originalUsername}</h3>
                            </div>
                            <div class="editable-data">
                                <h3>Password: </h3>
                                <h3 contenteditable={true} spellcheck={false} class="editable" ref={modalPasswordRef} >{modalData().originalPassword}</h3>
                            </div>
                            <div class="editable-data">
                                <h3>Notes: </h3>
                                <h3 contenteditable={true} spellcheck={false} class="editable" ref={modalNotesRef} >{modalData().originalNotes}</h3>
                            </div>
                            <button class="demo-input-button" onClick={() => editData(modalData().originalUsername, modalUsernameRef.innerText, modalPasswordRef.innerText, modalNotesRef.innerText)}>Save</button>
                        </dialog>
                    </div>
                    <Show when={encrypt()}>
                        <DemoEncrypted keytext={keytext()} plaintext={dataSignal()} />
                    </Show>
                </div>
            </div>
            <Footer />
        </main>
    )
}

const DemoDisplayBlock: Component<{deleteData: (username: string) => void, username: string, password: string, notes: string, editDataTrigger: (oldUsername: string, oldPass: string, oldNotes: string) => void}> = (props) => {
    return(
        <div class="demo-display-block">
            <div class="username-password">
                <div class="up-left">
                    <h3>Username: {props.username}</h3>
                    <h3>Password: {props.password}</h3>
                </div>
                <img src="/trash-solid.svg" onClick={() => props.deleteData(props.username)} />
            </div>
            <div class="notes-edit">
                <h3 id="demo-notes">Notes: {props.notes}</h3>
                <h3 id="demo-edit-button" onClick={() => props.editDataTrigger(props.username, props.password, props.notes)}>Edit</h3>
            </div>
        </div>
    )
}

export default Demo;