import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";

const SelfHosted: Component = () => {
  let sh: any;

  let tab1: any;
  let tab2: any;

  onMount(() => {
    sh.classList.add("active");
    sh.style.color = "#b2dcc9";
    sh.style.textDecoration = "underline";

    if (sessionStorage.getItem("coder") === "false") {
      tab2.click();
    } else {
      tab1.click();
    }
  });

  const toggleUnderline = (tab: string) => {
    if (tab === "tab-1") {
      //session storage
      sessionStorage.setItem("coder", "true");

      tab1.style.textDecoration = "underline";
      tab2.style.textDecoration = "none";
    } else if (tab === "tab-2") {
      //session storage
      sessionStorage.setItem("coder", "false");

      tab1.style.textDecoration = "none";
      tab2.style.textDecoration = "underline";
    }
  };

  return (
    <div id="inner-main">
      <div id="sidebar-section">
        <A href="/about/about-general" class="pseudo button">
          <h2>About CipherCrypt</h2>
        </A>
        <hr />
        <div id="sidebar-tabs">
          <A href="/about/zero-knowledge" class="pseudo button">
            Zero-knowledge encryption
          </A>
          <A href="/about/self-hostable" ref={sh} class="pseudo button">
            Self-hosted
          </A>
          <A href="/about/no-experience" class="pseudo button">
            Guided Setup: No Experience Required
          </A>
          <A href="/about/caching" class="toggle pseudo button">
            Built-in Caching
          </A>
          <A href="/about/technologies" class="toggle pseudo button">
            Powerful Technologies
          </A>
          <A href="/about/mongodb" class="toggle pseudo button">
            MongoDB support
          </A>
        </div>
      </div>
      <div id="article-tabs" class="tabs two">
        <input id="tab-1" type="radio" name="tabgroupB" checked />
        <label
          ref={tab1}
          id="tab-1-label"
          class="pseudo button toggle"
          onClick={() => toggleUnderline("tab-1")}
          for="tab-1"
        >
          I have Coding Experience
        </label>
        <input id="tab-2" type="radio" name="tabgroupB" />
        <label
          ref={tab2}
          class="pseudo button toggle"
          onClick={() => toggleUnderline("tab-2")}
          for="tab-2"
        >
          I want the Simpler Explanation
        </label>
        <div class="row">
          <div class="article">
            <h2>CipherCrypt is Self-Hosted</h2>
            <p>
              This is not a system for profit, but rather for any use by anyone
              who wants to use it.
            </p>
            <p>
              More importantly, this is a proof of concept, rather than a
              dedicated project. I, as the creator of this project, intend to
              continue working on CipherCrypt to improve and innovate it. That
              being said, there is a lot of responsibility in handling secret
              data. Some of the responsibility can be mitigated by resources I
              might not have access to. Nevertheless I can show a concept of
              something that works as a better alternative to what many use as a
              'storage' of passwords on their devices.
            </p>
            <p>
              Another key reason for this is that self-hosting such a project
              makes it more personal. It is yours to tinker and experiment with.
            </p>
            <p>
              And I will do my best in outlining how to set up the project
              properly.
            </p>
          </div>
          <div class="article">
            <h2>CipherCrypt is Self-Hosted</h2>
            <p>
              There is no pre-set version for you to use or pay for. There is a
              demo that you may feel free to try, but the project is self-hosted
              only.
            </p>
            <p>
              What this means is that you will need to set it up yourself, for
              which there is a step-by-step guide.
            </p>
            <h3>Why?</h3>
            <p>
              For starters, it is not a system for profit, and self hosting this
              is taking ownership of your own instance of this project.
            </p>
            <p>
              Additionally, there are differences in different data-encryption
              products offered by various companies with their own pros and
              cons, and this project comes with its own drawbacks.
            </p>
            <p>
              While some companies out there create password managers that rely
              on good hardware, they sometimes use weak software. Good companies
              will use both, good hardware and good software. There are many
              good companies in this sphere that offer extremely good products.
              CipherCrypt is a proof of concept, even though I plan on improving
              and innovating the project.
            </p>
            <p>
              But, the biggest weakness is in how it is implemented. For
              instance, many ecryption products rely on expensive hardware. But
              CipherCrypt is self-hosted, and you can implement it with any
              hardware you want, or use an online instance of MongoDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfHosted;
