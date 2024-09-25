import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import './index.scss'
import NavBar from "../components/NavBar";

export default function Home() {
  return (
      <main class="main-page">
        <NavBar />
        <header>
          <h1>Ciphercrypt</h1>
          <p>Password Manager</p>
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
