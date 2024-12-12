import type { Component } from "solid-js";
import { A } from "@solidjs/router";

const Footer: Component = () => {
  return (
    <div id="footer">
      <section id="footer-left">
        <h4 class="footer-el">CopyLeft</h4>
      </section>
      <section id="footer-right">
        <A
          href="https://github.com/IngeniumOfficial/CipherCryptDemo"
          class="pseudo button"
        >
          Github
        </A>
        <A class="pseudo button" href="/Demo">
          Demo
        </A>
      </section>
    </div>
  );
};

export default Footer;
