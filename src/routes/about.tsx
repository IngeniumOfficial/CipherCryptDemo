import { Title } from "@solidjs/meta";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"

export default function Home() {
  return (
    <main>
      <Title>CipherCrypt Demo - About</Title>
      <NavBar />
      <Footer />
    </main>
  );
}
