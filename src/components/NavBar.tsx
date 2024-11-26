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
    <div id="nav">
      <A href="/" id="nav-left" class="nav-section">
        <img src="/lock.svg" id="lock-icon" />
        <h2>CipherCrypt</h2>
      </A>

      <div class="menu">
        <A href="/about/about-general" id="about-button" class="pseudo button">
          About
        </A>
        <A href="/demo" id="demo-button" class="pseudo button">
          Demo
        </A>
      </div>
    </div>
  );
};

export default NavBar;
