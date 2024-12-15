import { RouteSectionProps, A } from "@solidjs/router";
import { onMount, Ref } from "solid-js";

import { Title } from "@solidjs/meta";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";

import "./about.scss";

export default function AboutLayout(props: RouteSectionProps) {
  // TODO: Control selection of readability from here

  // TODO: Make the following style change to active links:
  // cache.style.color = "#b2dcc9";
  // cache.style.textDecoration = "underline";

  return (
    <main>
      <Title>About - CipherCrypt</Title>
      <NavBar />
      <div id="sidebar-open-phone">
        <img src={"/menu.svg"} />
      </div>
      <div id="inner-main">
        <div id="sidebar-section">
          <A href="/about/about-general" class="pseudo button">
            <h2>About CipherCrypt</h2>
          </A>
          <hr />

          <div id="sidebar-tabs" class="menu">
            <A
              href="/about/zero-knowledge"
              id="zk"
              class="toggle pseudo button"
            >
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
            <A
              href="/about/technologies"
              id="tech"
              class="toggle pseudo button"
            >
              Powerful Technologies
            </A>
            <A href="/about/mongodb" id="mdb" class="toggle pseudo button">
              MongoDB support
            </A>
            <A href="/about/about-demo" id="demo" class="toggle pseudo button">
              About Demo
            </A>
          </div>
        </div>
        {props.children}
      </div>
      <Footer />
    </main>
  );
}
