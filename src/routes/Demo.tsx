import { createSignal, onMount, Switch, Match, For, Ref, Show } from "solid-js";
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


// TODO: Add an ability to move the passwords around and/or delete them
    // Unfortunately, this means reworking the id system
// Option 1: Switch data dependence to local storage only:
    // PROS: Easy to implement
    // CONS: Lacks re-rendering capability of stores and signals
// Option 2: Use a signal and local storage
    // No need for stores, since data will be moved around and readjusted as a whole instead of individual pieces
    // PROS: Re-rendering capability
    // CONS: Complexity in: local storage updates, overhead in signals, and...potentially needs an option for incremental first render to be skipped
// Option 3?: Is there another way to do this?

const Demo: Component = () => {
    const [loading, loadingSet] = createSignal('loading');
    const [keytext, keytextSet] = createSignal('');
    const [dataSignal, dataSignalSet] = createSignal<PasswordData[]>([]);
    const [encrypt, encryptSet] = createSignal(false);

    onMount(() => {
        checkLocalStorage();
    })

    const checkLocalStorage = () => {
        const lsData = localStorage.getItem("demoData");
        if(lsData) {
            const data = JSON.parse(lsData);
            loadingSet('good');
            for(let key in data) {
                runDisplay(data[key], parseInt(key) * 500);
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
        if(dataType === 'password') {
            // Add data to local storage
            const lsData = localStorage.getItem("demoData");
            if(lsData) {
                const localData = JSON.parse(lsData);
                localData.push(data);
                localStorage.setItem("demoData", JSON.stringify(localData));
            } else {
                localStorage.setItem("demoData", JSON.stringify([data]));
            }

            // If there is no data in dataStore, create it
            if(dataSignal.length === 0) {
                dataSignalSet([{
                    username: data.username,
                    password: data.password,
                    notes: data.notes
                }]);

                // Also, change loading state to good
                loadingSet('good');
            } else {
                // Otherwise, add data to the end of the array
                dataSignalSet((prev) => [...prev, {
                    username: data.username,
                    password: data.password,
                    notes: data.notes
                }]);
            }
        }
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
        // // Check if keytext or dataStore is empty
        // if(dataSignal.length === 0) {
        //     alert("Cannot encrypt without any data");
        // } else if(keytext().length === 0 || keytext() === '') {
        //     alert("Cannot encrypt without a key");
        // } else {
        //     innerMain.style.alignItems = "flex-start";
        // }
        encryptSet(true);
    }

    let addPassEmpty: any;
    let addUsernameEmpty: any;
    let addNotesEmpty: any;
    let addUsernameGood: any;
    let addPassGood: any;
    let addNotesGood: any;
    let innerMain: any;

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
                                        <input ref={addUsernameEmpty} type="text" id="demo-input-username-empty" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Password: </h3>
                                        <input ref={addPassEmpty} type="text" id="demo-input-pass-empty" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Notes: </h3>
                                        <input ref={addNotesEmpty} type="text" id="demo-input-notes-empty" />
                                    </div>
                                    <h3 id="demo-input-button" class="demo-input-button" onClick={() => addData('password', {username: addUsernameEmpty.value, password: addPassEmpty.value, notes: addNotesEmpty.value})}>Add Note</h3>
                                </div>
                            </div>
                        </Match>
                        <Match when={loading() === 'good'}>
                            <button class="debug" onClick={() => {localStorage.clear(); window.location.reload();}}>Clear Local Storage and Reload</button>
                            <div id="demo-good">
                                <For each={dataSignal()}>
                                    {(dataPiece) => (
                                        <DemoDisplayBlock username={dataPiece.username} password={dataPiece.password} notes={dataPiece.notes} />
                                    )}
                                </For>
                                <div class="demo-input">
                                    <div class='input-section'>
                                        <h3>Username: </h3>
                                        <input ref={addUsernameGood} type="text" id="demo-input-username-good" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Password: </h3>
                                        <input ref={addPassGood} type="text" id="demo-input-pass-good" />
                                    </div>
                                    <div class='input-section'>
                                        <h3>Notes: </h3>
                                        <input ref={addNotesGood} type="text" id="demo-input-notes-good" />
                                    </div>
                                    <button class="demo-input-button" onClick={() => addData('password', {username: addUsernameGood.value, password: addPassGood.value, notes: addNotesGood.value})}>Add Note</button>
                                </div>
                            </div>
                        </Match>
                    </Switch>
                    <div id="encryption-settings">
                        <h3>Key: </h3>
                        <input type="text" id="keytext" placeholder="Use any word or sentence as Key" onChange={(e) => keytextSet(e.currentTarget.value)} />
                        <button class="demo-input-button" onClick={() => activateEncryption()}>Encrypt the Data</button>
                    {/* </div> */}
                    <Show when={encrypt()}>
                        <DemoEncrypted keytext={keytext()} plaintext={dataSignal()} />
                    </Show>
                </div>
            </div>
            <Footer />
        </main>
    )
}

const DemoDisplayBlock: Component<PasswordData> = (props: PasswordData) => {
    return(
        <div class="demo-display-block">
            <div class="username-password">
                <h3>Username: {props.username}</h3>
                <h3>Password: {props.password}</h3>
            </div>
            <h3>Notes: {props.notes}</h3>
        </div>
    )
}

export default Demo;