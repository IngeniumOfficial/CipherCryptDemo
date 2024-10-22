import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"
import ciphercrypt_tech1 from "/ciphercrypt_tech1.png";

const Caching: Component = () => {
    const [explanation, setExplanation] = createSignal(true);
  onMount(() => {
    const explanation = localStorage.getItem("explanation");
    if(explanation === "notcoder") {
      setExplanation(false)
      notcoder.checked = true;
    } else {
      coder.checked = true;
    }
  })

  let coder: any;
  let notcoder: any;

  const changeExplanation = (explanation: boolean) => {
    if(explanation) {
      localStorage.setItem("explanation", "coder");
      setExplanation(true);
    } else if (!explanation) {
      localStorage.setItem("explanation", "notcoder");
      setExplanation(false);
    }
  }

    return(
        <main>
            <Title>CipherCrypt Demo - About</Title>
            <NavBar />
            <div id="inner-main">
                <div id="sidebar-section">
                    <div id="sidebar-options" class="radio-input">
                        <div class="radio-section">
                        <input ref={coder} type="radio" id="coder" value="coder" checked name="explanation" onChange={() => changeExplanation(true)} />
                        <label for="coder">I have Coding Experience</label>
                        </div>
                        <div class="radio-section">
                        <input ref={notcoder} type="radio" id="notcoder" value="notcoder" name="explanation" onChange={() => changeExplanation(false)} />
                        <label for="notcoder">I want the Simple Explanation</label>
                        </div>
                    </div>
                    <div id="sidebar">
                        <A href="/about"><h1>Core Functionalities</h1></A>
                        <hr />
                        <A href="/about/zero-knowledge"><h2>Zero Knowledge Encryption</h2></A>
                        <A href="/about/self-hostable"><h2>Self Hosted</h2></A>
                        <A href="/about/no-experience"><h2>Easy Setup</h2></A>
                        <A href="/about/mongodb"><h2>MongoDB Support</h2></A>
                        <A href="/about/technologies"><h2>Core Technologies</h2></A>
                        <A href="/about/caching"><h2>Caching</h2></A>
                    </div>
                </div>
                <Show when={explanation()} fallback={<div class="article">
                    <h2>Caching</h2>
                    <h3>What is Caching?</h3>
                    <p>
                      Caching is when data is temporarily stored in a location that is fast to access.
                      In CipherCrypt, data (such as user login data, encrypted passwords and notes, and so on) is stored in a database.
                      The database can be fast, but is still limited by the way the database interacts with the hardware. Typically, databases are stored on a drive (HDD or SSD).
                      Caching can mean many different things, but is typically stored in memory (RAM). Access to data that is held in memory is pretty much instant.
                    </p>
                    <h3>Why isn't Caching used instead of the Database?</h3>
                    <p>
                      Typically, caching is unreliable to use for data storage. If a caching server instance is shut down for any reason, everything in the cache is erased.
                      However, CipherCrypt uses Redis as its caching server instance. Redis has a failsafe mechanism that takes "screenshots" of the data, which it stores on disk, so if anything goes wrong, the data can be recovered.
                      While that is a neat feature, CipherCrypt still doesn't use Redis to replace the database. The application needs a database that works well with large amounts of data, and working with Redis with these demands becomes a challenge.
                      So, Redis is used as caching.
                    </p>
                    <h4>If this is a bit difficult to understand, it might be a good idea to read the <A href="/about/technologies" class="inline-link">Core Technologies</A> article, especially the Caching section.</h4>
                    <p>
                      As to what it actually does, the Caching server is used to store data that both the Next.js server and the API servers often use.
                      There is also an option that users can enable that allows more data to be stored in the cache at the cost of a heavier workload on the server.
                    </p>
                </div>}>
                  <div class="article">
                        <h2>Caching</h2>
                        <p>
                          Caching in CipherCrypt is handled by a Caching Server Instance that runs Redis. Recently, there has been some controversy concerning Redis in the Open Source community.
                          Although currently, during development, CipherCrypt is using an older version of Redis, there are plenty of drop-in replacements for Redis that are available. Before the project launches, an alternative will be chosen for use.
                        </p>
                        <p>
                          The purpose of Caching is to speed up data transfer. A lot of data is reused: the server often needs to recheck some data, the user might want to review the same data.
                          Although encryption makes it tricky, it works wonders in increasing efficiency.
                        </p>
                        <p>
                          Additionally, users are provided an option for increased caching. This allows the program to rely more on storing data temporarily in cache. While this speeds up the data transfer, this can increase the server workload.
                        </p>
                        <p>
                          To understand more about the interactions of the Caching Server instance with the rest of the Technologies, please refer to the <A href="/about/technologies" class="inline-link">Core Technologies</A> section.
                        </p>
                  </div>
                </Show>
            </div>
            <Footer />
        </main>
    )
}

export default Caching;