import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref } from "solid-js";

const NoExperience: Component = () => {

    return(
                <div class="article">
                    <h2>Easy Setup, No Experience in Coding Needed</h2>
                    <p>
                        As mentioned in the <A href="/about/self-hostable">Self Hosted Article</A>, this project is made for anyone to tinker with, and the docs are here to assist with the setup process.
                    </p>
                    <p>
                        There are many articles here that might help anyone understand how encryption, hashing, passwords, and security works in the world of technologies.
                    </p>
                    <p>
                        Also, in case you missed it, there is a navigation tool on the top left which allows you to choose the level of explanation you might need in understanding key topics and articles.
                    </p>
                </div>
    )
}

export default NoExperience;