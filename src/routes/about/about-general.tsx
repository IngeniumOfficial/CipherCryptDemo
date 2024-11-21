import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import { createSignal, onMount, Ref, Show } from "solid-js";

export default function AboutGeneral() {
  return (
    <div id="inner-main">
      <div id="sidebar-section">
        <A href="/about/about-general" class="pseudo button">
          <h2>About CipherCrypt</h2>
        </A>
        <hr />
        <div id="sidebar-tabs">
          <A href="/about/zero-knowledge" id="zk" class="toggle pseudo button">
            Zero-knowledge encryption
          </A>
          <A href="/about/self-hostable" id="sh" class="toggle pseudo button">
            Self-hosted
          </A>
          <A href="/about/no-experience" id="gs" class="toggle pseudo button">
            Guided Setup: No Experience Required
          </A>
          <A href="/about/caching" id="cache" class="toggle pseudo button">
            Built-in Caching
          </A>
          <A href="/about/technologies" id="tech" class="toggle pseudo button">
            Powerful Technologies
          </A>
          <A href="/about/mongodb" id="mdb" class="toggle pseudo button">
            MongoDB support
          </A>
        </div>
      </div>
      <div class="article" id="main-descriptor">
        <p>
          <b>CipherCrypt</b> is an attempt to create a simple alternative to
          storing passwords in plain text on your notepad or using the same
          password for everything.
        </p>
        <p>
          This project uses technologies in an efficient and effective way.
          However, although CipherCrypt is free, and uses top of the line
          algorithms and technologies, it comes with its drawbacks.
        </p>
        <p>
          CipherCrypt is self-hosted, and uses MongoDB as the database. It's
          that simple. However, this also means that it doesn't require any
          expensive hardware that could come with its own security.
        </p>
        <p>
          On the top left, feel free to select between the two options for
          better understanding some of the other topics here.
        </p>
      </div>
    </div>
  );
}
