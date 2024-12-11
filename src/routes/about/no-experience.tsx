import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref } from "solid-js";

const NoExperience: Component = () => {
  return (
    <div class="article" id="no-experience-article">
      <h2>Easy Setup, No Experience in Coding Needed</h2>
      <p>
        As mentioned in the{" "}
        <A href="/about/self-hostable">Self Hosted Article</A>, this project is
        made for anyone to tinker with, and the docs are here to assist with the
        setup process.
      </p>
      <p>
        CipherCrypt is here to show how complex password management can be
        achieved regardless of the experience level of the user.
      </p>
      <p>
        There are many articles here that might help anyone understand how
        encryption, hashing, passwords, and security works in the world of
        technologies. Feel free to look around and find what you need.
      </p>
      <p>
        Also, in case you missed it, for the other articles in the about us
        section, you can select at the top of the page whether you have coding
        experience or want the simpler explanation.
      </p>
    </div>
  );
};

export default NoExperience;
