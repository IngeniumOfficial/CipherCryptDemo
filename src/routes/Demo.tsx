import { createSignal, onMount, Switch, Match, For } from "solid-js";
import type { Component } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./Demo.scss"

const Demo: Component = () => {
    const [loading, loadingSet] = createSignal('loading');
    const [data, dataSet] = createSignal<any[]>([]);

    onMount(() => {
        checkLocalStorage();
    })

    const checkLocalStorage = () => {
        const lsData = localStorage.getItem("demoData");
        if(lsData) {
            const data = JSON.parse(lsData);
            loadingSet('good');
            for(let i = 0; i < data.length; i++) {
                runDisplay(data[i], i * 1000);
            }
        } else {
            loadingSet('empty');
        }
    }

    const runDisplay = (dataPiece: any, time: number) => {
        setTimeout(() => {
            if(data().length > 0) {
                dataSet((prev) => [...prev, dataPiece]);
            } else {
                dataSet([dataPiece]);
            }
        }, time)
    }

    return(
        <main>
            <NavBar />
            <div id="inner-main">
                <Switch>
                    <Match when={loading() === 'loading'}>
                        <h1>Loading...</h1>
                    </Match>
                    <Match when={loading() === 'empty'}>
                        <div>
                            <h2>No Data Found. Add Password or Note Below</h2>
                            <div id="demo-input">
                                <input type="text" id="demo-input-text" onChange={(e) => dataSet((prev: any) => [...prev, e.target.value])} />
                                <button id="demo-input-button" onClick={() => localStorage.setItem("demoData", JSON.stringify(data()))}>Add Note</button>
                            </div>
                        </div>
                    </Match>
                    <Match when={loading() === 'good'}>
                        <button class="debug" onClick={() => localStorage.clear()}>Clear Local Storage</button>
                        <div id="demo-good">
                            <For each={data()}>
                                {(dataPiece) => (
                                    <h3>{dataPiece}</h3>
                                )}
                            </For>
                            <div id="demo-input">
                                <input type="text" id="demo-input-text" onChange={(e) => dataSet((prev: any) => [...prev, e.target.value])} />
                                <button id="demo-input-button" onClick={() => localStorage.setItem("demoData", JSON.stringify(data()))}>Add Note</button>
                            </div>
                        </div>
                    </Match>
                </Switch>
            </div>
            <Footer />
        </main>
    )
}

export default Demo;