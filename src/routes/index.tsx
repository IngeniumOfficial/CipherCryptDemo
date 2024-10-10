import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { onMount, Ref } from "solid-js";
import './index.scss'
import NavBar from "../components/NavBar";
import lock4_1 from "/lock4_1.png";

export default function Home() {
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
          <img src={lock4_1} />
          <section>
            <div><h1 ref={headerRef1}></h1><h1 id="blinker1" ref={blinker1}></h1></div>
            <div><h3 ref={headerRef2}></h3><h3 id="blinker2" ref={blinker2}></h3></div>
          </section>
        </header>
        <section id="hero">
          <image href="/lock3.png" class="min-w-44" />
        </section>
        <section id="features">
          <h2>Key Features</h2>
          <div class="feature">
            <i class="fa-lock"></i>
            <h3>Zero-knowledge encryption</h3>
            <p>Only you have access to your passwords. We can't read them, and neither can anyone else.</p>
          </div>
          <div class="feature">
            <i class="fa-server"></i>
            <h3>Self-hostable, free for anyone</h3>
            <p>Host Ciphercrypt on your own server, or use our free hosting option. No credit card required.</p>
          </div>
          <div class="feature">
            <i class="fa-cog"></i>
            <h3>Easy setup, no code experience needed</h3>
            <p>Get started in minutes, without needing to know how to code.</p>
          </div>
          <div class="feature">
            <i class="fa-database"></i>
            <h3>MongoDB support (SQL integration planned)</h3>
            <p>Store your passwords securely in MongoDB, with plans for SQL integration in the future.</p>
          </div>
          <div class="feature">
            <i class="fa-code"></i>
            <h3>Built with Go, Next.js, Argon2, and AES 256</h3>
            <p> Ciphercrypt uses modern, secure technologies to keep your passwords safe.</p>
          </div>
          <div class="feature">
            <i class="fa-rocket"></i>
            <h3>Redis caching for faster performance</h3>
            <p>Get fast access to your passwords with Redis caching.</p>
          </div>
        </section>
        <section>
          <button>
            <A href="/demo">Check out the demo</A>
          </button>
        </section>
      </main>
  );
}
