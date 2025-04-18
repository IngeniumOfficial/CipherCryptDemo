import { Title, Link } from "@solidjs/meta";
import { A } from "@solidjs/router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import lock4_1 from "/lock4_1.png";

// import "picnic/picnic.min.css";
import "./index.scss";

export default function Home() {
  return (
    <main>
      <Title>Ciphercrypt</Title>
      <NavBar />
      <div id="main-content">
        <header>
          <h1 id="pre-colored">The Password Manager</h1>
          <h1 id="colored">You</h1>
          <h1>Control</h1>
        </header>
        <div id="subheader">
          <A href="/demo" class="pseudo button" id="try-demo">
            Try the Demo
          </A>
          <A href="/about/about-general" class="pseudo button" id="learn-more">
            Learn More
          </A>
        </div>
        <hr class="divider" />
        <h2
          id="sub-title"
          onClick={() =>
            document
              .getElementById("info-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          How Ciphercrypt Works
        </h2>
        <h4 id="sub-title-2">Click on any of the Topics Below to Learn More</h4>
        <div id="info-section">
          <img src="/lock4_2.png" />
          <div id="info-cards">
            <A href="/about/zero-knowledge" class="pseudo button">
              Zero-knowledge encryption
            </A>
            <A href="/about/self-hostable" class="pseudo button">
              Self-hosted
            </A>
            <A href="/about/no-experience" class="pseudo button">
              Guided Setup: No Experience Required
            </A>
            <A href="/about/caching" class="pseudo button">
              Built-in Caching
            </A>
            <A href="/about/technologies" class="pseudo button">
              Powerful Technologies
            </A>
            <A href="/about/mongodb" class="pseudo button">
              MongoDB support
            </A>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
