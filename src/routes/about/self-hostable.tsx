import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"

const SelfHosted: Component = () => {
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
                    <h2>CipherCrypt is Self-Hosted</h2>
                    <p>
                        This is not a system for profit, but rather for any use by anyone who wants to use it.
                    </p>
                    <p>
                        More importantly, this is a proof of concept, rather than a dedicated project. I, as the creator of this project, intend to continue working on CipherCrypt to improve and innovate it.
                        That being said, there is a lot of responsibility in handling secret data. Some of the responsibility can be mitigated by resources I might not have access to.
                        Nevertheless I can show a concept of something that works as a better alternative to what many use as a 'storage' of passwords on their devices.
                    </p>
                    <p>
                        Another key reason for this is that self-hosting such a project makes it more personal. It is yours to tinker and experiment with.
                    </p>
                    <p>
                        And I will do my best in outlining how to set up the project properly.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default SelfHosted;