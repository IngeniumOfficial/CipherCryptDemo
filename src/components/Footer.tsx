import type { Component } from 'solid-js'
import { A } from "@solidjs/router";
import './Footer.scss'

const Footer: Component = () => {
    return(
        <div id="footer">
            <section id='footer-left'>
                <h2 class='footer-el'>Copyleft 2024</h2>
            </section>
            <section id='footer-right'>
                <h2 class='footer-el'>Github</h2>
                <A href="/Demo"><h2 class='footer-el'>Demo</h2></A>
            </section>
        </div>
    )
}

export default Footer