import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"

const MongoDB: Component = () => {
    const [explanation, setExplanation] = createSignal(true);
  onMount(() => {
    const explanation = localStorage.getItem("explanation");
    if(explanation === "notcoder") {
      setExplanation(false)
      notcoder.checked = true;
    } else {
      coder.checked = true;
    }
  })

  let coder: any;
  let notcoder: any;

    return(
        <main>
            <Title>CipherCrypt Demo - About</Title>
            <NavBar />
            <div id="inner-main">
                <div id="sidebar-section">
                    <div id="sidebar-options" class="radio-input">
                        <div class="radio-section">
                        <input ref={coder} type="radio" id="coder" value="coder" checked name="explanation" onChange={() => localStorage.setItem("explanation", "coder")} />
                        <label for="coder">I have Coding Experience</label>
                        </div>
                        <div class="radio-section">
                        <input ref={notcoder} type="radio" id="notcoder" value="notcoder" name="explanation" onChange={() => localStorage.setItem("explanation", "notcoder")} />
                        <label for="notcoder">I want the Simple Explanation</label>
                        </div>
                    </div>
                    <div id="sidebar">
                        <A href="/about"><h1>Core Functionalities</h1></A>
                        <hr />
                        <A href="/about/zero-knowledge"><h2>Zero Knowledge Encryption</h2></A>
                        <h2>Self Hosted</h2>
                        <h2>Easy Setup</h2>
                        <h2>MongoDB Support</h2>
                        <h2>Core Technologies</h2>
                        <h2>Caching</h2>
                    </div>
                </div>
                <div class="article">
                    <h2>MongoDB Support (SQL Planned)</h2>
                    <p>
                        At the moment only MongoDB is supported for this project.
                    </p>
                    <p>
                        <b>Why?</b> Simply put, it's significantly better at handling non-relational tasks than SQL.
                        MongoDB is faster than SQL databases,
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default MongoDB;