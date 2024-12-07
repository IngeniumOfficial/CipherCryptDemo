import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { Show, createSignal, onMount, Ref } from "solid-js";

const NavBar: Component = () => {
  // const [windowWidth, setWindowWidth] = createSignal(0);

  // onMount(() => {
  //     if(typeof window !== "undefined") {
  //         setWindowWidth(window.innerWidth);
  //     }
  // })

  // const toggleMenuOn = () => {
  //     menuOverlayRef.style.display = "block";
  //     menuOverlayRef.style.zIndex = "5";
  //     menuModalRef.show();
  //     menuModalRef.style.overflow = "hidden";
  // }

  // const toggleMenuOff = () => {
  //     menuOverlayRef.style.display = "none";
  //     menuOverlayRef.style.zIndex = "-1";
  //     menuModalRef.close();
  //     menuModalRef.style.overflow = "visible";
  // }

  // let menuOverlayRef: any;
  // let menuModalRef: any;

  return (
    <nav id="nav">
      <A href="/" id="nav-left" class="nav-section">
        <img src="/lock.svg" id="lock-icon" />
        <h2>CipherCrypt</h2>
      </A>

      <input id="bmenub" type="checkbox" class="show" />
      <label for="bmenub" class="burger toggle pseudo button">
        <img src={"/menu.svg"} />
      </label>

      <div class="menu">
        <A
          href="/about/about-general"
          id="about-button"
          class="pseudo button active"
        >
          About
        </A>
        <A href="/demo" id="demo-button" class="pseudo button">
          Demo
        </A>
        <A href="/" id="github-button" class="pseudo button">
          Github
        </A>
      </div>
    </nav>
  );
};

export default NavBar;
