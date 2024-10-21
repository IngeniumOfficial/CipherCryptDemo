import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"

const NoExperience: Component = () => {
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

  const changeExplanation = (explanation: boolean) => {
    if(explanation) {
      localStorage.setItem("explanation", "coder");
      setExplanation(true);
    } else if (!explanation) {
      localStorage.setItem("explanation", "notcoder");
      setExplanation(false);
    }
  }

    return(
        <main>
            <Title>CipherCrypt Demo - About</Title>
            <NavBar />
            <div id="inner-main">
                <div id="sidebar-section">
                    <div id="sidebar-options" class="radio-input">
                        <div class="radio-section">
                        <input ref={coder} type="radio" id="coder" value="coder" checked name="explanation" onChange={() => changeExplanation(true)} />
                        <label for="coder">I have Coding Experience</label>
                        </div>
                        <div class="radio-section">
                        <input ref={notcoder} type="radio" id="notcoder" value="notcoder" name="explanation" onChange={() => changeExplanation(false)} />
                        <label for="notcoder">I want the Simple Explanation</label>
                        </div>
                    </div>
                    <div id="sidebar">
                        <A href="/about"><h1>Core Functionalities</h1></A>
                        <hr />
                        <A href="/about/zero-knowledge"><h2>Zero Knowledge Encryption</h2></A>
                        <A href="/about/self-hostable"><h2>Self Hosted</h2></A>
                        <A href="/about/no-experience"><h2>Easy Setup</h2></A>
                        <A href="/about/mongodb"><h2>MongoDB Support</h2></A>
                        <A href="/about/technologies"><h2>Core Technologies</h2></A>
                        <A href="/caching"><h2>Caching</h2></A>
                    </div>
                </div>
                <div class="article">
                    <h2>Easy Setup, No Experience in Coding Needed</h2>
                    <p>
                        As mentioned in the <A href="/about/self-hostable">Self Hosted Article</A>, this project is made for anyone to tinker with, and the docs are here to assist with the setup process.
                    </p>
                    <p>
                        There are many articles here that might help anyone understand how encryption, hashing, passwords, and security works in the world of technologies.
                    </p>
                    <p>
                        Also, in case you missed it, there is a navigation tool on the top left which allows you to choose the level of explanation you might need in understanding key topics and articles.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default NoExperience;