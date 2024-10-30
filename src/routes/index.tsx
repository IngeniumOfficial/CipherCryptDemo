import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { onMount, Ref, createSignal } from "solid-js";
import './index.scss'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
// import lock4_1 from "/lock4_1.png";

export default function Home() {
  const [initialText, setInitialText] = createSignal<string>("CipherCrypt");

  onMount(() => {
    blinker1.innerText = "|";
    typeWriter("CipherCrypt", headerRef1, blinker1)
    setTimeout(() => {
      blinker2.innerText = "|";
      typeWriter("Password Manager", headerRef2, blinker2)
    }, 2700)
  })

  const typeWriter = (text: string, elementRef: any, blinkerRef: any) => {
    let i = 0;
    let timer = setInterval(() => {
      if (i < text.length) {
        elementRef.innerHTML += text.charAt(i);
        i++;
      } else {
        blinkerRef.innerText = "";
        clearInterval(timer);
      }
    }, 180);
  }

  let headerRef1: any;
  let headerRef2: any;
  let blinker1: any;
  let blinker2: any;

  return (
      <main class="main-page">
        <NavBar />
        <header>
          <img src="/lock4_1.png" />
          <section>
            <div><h1 ref={headerRef1}></h1><h1 id="blinker1" ref={blinker1}></h1></div>
            <div><h3 ref={headerRef2}></h3><h3 id="blinker2" ref={blinker2}></h3></div>
          </section>
        </header>
        {/* <section id="hero">
          <img src="/lock3.png" class="min-w-44" />
        </section> */}
        <A href="/demo" id="demo-title">Check out the Demo</A>
        <hr class="divider" />
        <h2 id="features-title">Key Features</h2>
        <section id="features">

          <div class="card">
            <div class="first-content" id="feature1">
              <h3>Zero-knowledge encryption</h3>
            </div>
            <A href="/about/zero-knowledge" class="second-content">
              <p>Only you have access to your passwords. We can't read them, and neither can anyone else.</p>
            </A>
          </div>

          <div class="card">
            <div class="first-content" id="feature2">
              <h3>Self-hostable, free for anyone</h3>
            </div>
            <A href="/about/self-hostable" class="second-content">
              <p>Host Ciphercrypt on your own server, or use our free hosting option. No credit card required.</p>
            </A>
          </div>

          <div class="card">
            <div class="first-content" id="feature3">
              <h3>Easy setup, no code experience needed</h3>
            </div>
            <A href="/about/no-experience" class="second-content">
              <p>Get started in minutes, without needing to know how to code.</p>
            </A>
          </div>

          <div class="card">
            <div class="first-content" id="feature4">
              <h3>MongoDB support (SQL integration planned)</h3>
            </div>
            <A href="/about/mongodb" class="second-content">
              <p>Store your passwords securely in MongoDB, with plans for SQL integration in the future.</p>
            </A>
          </div>

          <div class="card">
            <div class="first-content" id="feature5">
              <h3>Built with Go, Next.js, Argon2, and AES 256</h3>
            </div>
            <A href="/about/technologies" class="second-content">
              <p> Ciphercrypt uses modern, secure technologies to keep your passwords safe.</p>
            </A>
          </div>

          <div class="card">
            <div class="first-content" id="feature6">
              <h3>Redis caching for faster performance</h3>
            </div>
            <A href="/about/caching" class="second-content">
              <p>Get fast access to your passwords with Redis caching.</p>
            </A>
          </div>

        </section>
        {/* <section>
          <button>
            <A href="/demo">Check out the demo</A>
          </button>
        </section> */}
        <Footer />
      </main>
  );
}
