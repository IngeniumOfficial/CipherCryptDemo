import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import "./NavBar.scss";

const NavBar: Component = () => {
    return (
        <nav>
            <section id="nav-left" class="nav-section">
                <A href="/" class="nav-el">Ciphercrypt</A>
            </section>
            <section id="nav-right" class="nav-section">
                <A href="/demo" class="nav-el">Demo</A>
                <A href="/about" class="nav-el">About</A>
            </section>
        </nav>
    )
}

export default NavBar