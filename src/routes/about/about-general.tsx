import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import { createSignal, onMount, Ref, Show } from "solid-js";

export default function AboutGeneral() {
  return (
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
        CipherCrypt is self-hosted, and uses MongoDB as the database. It's that
        simple. However, this also means that it doesn't require any expensive
        hardware that could come with its own security.
      </p>
      <p>
        As you navigate through the other articles, notice that many will have
        an option to select whether you have an experience with coding or not.
        This is done in hopes that anyone can understand how CipherCrypt works
        and the issue it's trying to solve.
      </p>
    </div>
  );
}
