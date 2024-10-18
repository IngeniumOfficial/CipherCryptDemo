import { Title } from "@solidjs/meta";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"

export default function Home() {
  return (
    <main>
      <Title>CipherCrypt Demo - About</Title>
      <NavBar />
      <div id="inner-main">
        <div id="sidebar-section">
          <div id="sidebar-options" class="radio-input">
            <div class="radio-section">
              <input type="radio" id="coder" value="coder" checked name="explanation" />
              <label for="coder">I have Coding Experience</label>
            </div>
            <div class="radio-section">
              <input type="radio" id="notcoder" value="notcoder" name="explanation" />
              <label for="notcoder">I want the Simple Explanation</label>
            </div>
          </div>
          <div id="sidebar">
            <h1>About</h1>
            <h2>Zero Knowledge Encryption</h2>
            <h2>Self Hosted</h2>
            <h2>Easy Setup</h2>
            <h2>MongoDB Support</h2>
            <h2>Core Technologies</h2>
            <h2>Caching</h2>
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
        </div>
      </div>
      <Footer />
    </main>
  );
}
