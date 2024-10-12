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
        <div id="sidebar">
          <h2>Zero Knowledge Encryption</h2>
          <h2>Self Hosted</h2>
          <h2>Easy Setup</h2>
          <h2>MongoDB Support</h2>
          <h2>Core Technologies</h2>
          <h2>Caching</h2>
        </div>
        <div id="main-descriptor">
          <h2>
            
          </h2>
        </div>
      </div>
      <Footer />
    </main>
  );
}
