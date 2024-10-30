import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { Show, createSignal, onMount, Ref } from "solid-js";
import "./NavBar.scss";

const NavBar: Component = () => {
    const [windowWidth, setWindowWidth] = createSignal(0);

    onMount(() => {
        if(typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
        }
    })

    const toggleMenuOn = () => {
        menuOverlayRef.style.display = "block";
        menuOverlayRef.style.zIndex = "5";
        menuModalRef.show();
        menuModalRef.style.overflow = "hidden";
    }

    const toggleMenuOff = () => {
        menuOverlayRef.style.display = "none";
        menuOverlayRef.style.zIndex = "-1";
        menuModalRef.close();
        menuModalRef.style.overflow = "visible";
    }

    let menuOverlayRef: any;
    let menuModalRef: any;

    return (
        <nav>
            <section id="nav-left" class="nav-section">
                <A href="/" class="nav-el">Ciphercrypt</A>
            </section>
            <section id="nav-right" class="nav-section">
                <Show when={windowWidth() > 500}
                fallback={
                    <img src="/menu.svg" id="menu-icon" onClick={() => toggleMenuOn()} />
                }>
                    <A href="/demo" class="nav-el">Demo</A>
                    <A href="/about" class="nav-el">About</A>
                </Show>
            </section>
            <div id="overlay" ref={menuOverlayRef} onClick={(e: any) => {if(e.target === menuOverlayRef) toggleMenuOff()}}>
                <dialog ref={menuModalRef}>
                    <A href="/" class="nav-el">Ciphercrypt</A>
                    <hr id="menu-divider" />
                    <A href="/demo" class="nav-el">Demo</A>
                    <A href="/about" class="nav-el">About</A>
                    <ul>
                        <A href="/about/zero-knowledge"><li>Zero-Knowledge Encryption</li></A>
                        <A href="/about/no-experience"><li>Easy Setup</li></A>
                        <A href="/about/self-hostable"><li>Self-Hosted</li></A>
                        <A href="/about/technologies"><li>Technologies</li></A>
                        <A href="/about/mongodb"><li>MongoDB</li></A>
                        <A href="/about/caching"><li>Caching</li></A>
                    </ul>
                </dialog>
            </div>
        </nav>
    )
}

export default NavBar