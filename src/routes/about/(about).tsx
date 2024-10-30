import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"
import { createSignal, onMount, Ref, Show } from "solid-js";

export default function Home() {
  const [explanation, setExplanation] = createSignal(true);
  const [windowWidth, setWindowWidth] = createSignal(0);
  onMount(() => {
    if(typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }

    const explanation = localStorage.getItem("explanation");
    if(explanation === "notcoder") {
      setExplanation(false)
      notcoder.checked = true;
    } else {
      coder.checked = true;
    }
  })

  const modalOn = () => {
    aboutMenuModalRef.style.display = "flex";
    aboutMenuModalRef.show();
    document.body.style.overflow = "hidden";
  }

  const modalOff = () => {
    aboutMenuModalRef.style.display = "none";
    aboutMenuModalRef.close();
    document.body.style.overflow = "visible";
  }

  let coder: any;
  let notcoder: any;
  let aboutMenuModalRef: any;
  let aboutMenuOverlayRef: any;

  return (
    <main>
      <Title>CipherCrypt Demo - About</Title>
      <NavBar />
      <div id="inner-main">
          <Show when={windowWidth() > 700} fallback={
            <div id="sidebar-section">
              <div id="sidebar-menu" onClick={modalOn}>
                <h3>{'>'} About Menu</h3>
                {/* <img id="menu-icon" src="/menu-scale.svg" /> */}
              </div>
              <hr id="mini-sidebar-hr" />
              <hr id="small-sidebar-hr" />
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
          </div>
          }>
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
        </Show>
        <dialog ref={aboutMenuModalRef}>
          <h3 onClick={modalOff} id="about-menu">{'v'} About Menu</h3>
          <A href="/about"><h3>About CipherCrypt</h3></A>
          <hr />
          <A href="/about/zero-knowledge"><h4>- Zero Knowledge Encryption</h4></A>
          <A href="/about/self-hostable"><h4>- Self Hosted</h4></A>
          <A href="/about/no-experience"><h4>- No Coding Experience</h4></A>
          <A href="/about/mongodb"><h4>- MongoDB Support</h4></A>
          <A href="/about/technologies"><h4>- Core Technologies</h4></A>
          <A href="/about/caching"><h4>- Caching</h4></A>
        </dialog>
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
