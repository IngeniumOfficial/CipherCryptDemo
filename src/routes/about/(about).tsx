import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"
import { createSignal, onMount, Ref } from "solid-js";

export default function Home() {
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

  return (
    <main>
      <Title>CipherCrypt Demo - About</Title>
      <NavBar />
      <div id="inner-main">
        <div id="sidebar-section">
          <div id="sidebar-options" class="radio-input">
            <div class="radio-section">
              <input ref={coder} type="radio" id="coder" value="coder" name="explanation" onChange={() => localStorage.setItem("explanation", "coder")} />
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
            <A href="/about/self-hostable"><h2>Self Hosted</h2></A>
            <A href="/about/no-experience"><h2>Easy Setup</h2></A>
            <A href="/about/mongodb"><h2>MongoDB Support</h2></A>
            <A href="/about/technologies"><h2>Core Technologies</h2></A>
            <A href="/about/caching"><h2>Caching</h2></A>
          </div>
        </div>
        <div class="article" id="main-descriptor">
          <p>
            <b>CipherCrypt</b> is an attempt to create a simple alternative to storing passwords in plain text on your notepad or using the same password for everything.
          </p>
          <p>
            This project uses technologies in an efficient and effective way. However, although CipherCrypt is free, and uses top of the line algorithms and technologies, it comes with its drawbacks.
          </p>
          <p>
            CipherCrypt is self-hosted, and uses MongoDB as the database. It's that simple. However, this also means that it doesn't require any expensive hardware that could come with its own security.
          </p>
          <p>
            On the top left, feel free to select between the two options for better understanding some of the other topics here.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
