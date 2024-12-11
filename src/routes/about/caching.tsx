import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";
import ciphercrypt_tech1 from "/ciphercrypt_tech1.png";

const Caching: Component = () => {
  let cache: any;
  let tab1: any;
  let tab2: any;

  onMount(() => {
    // check session storage for coder data
    if (sessionStorage.getItem("coder") === "false") {
      tab2.click();
    } else {
      tab1.click();
    }
  });

  const toggleUnderline = (tab: string) => {
    if (tab === "tab-1") {
      // store in session storage as well
      sessionStorage.setItem("coder", "true");

      tab1.style.textDecoration = "underline";
      tab2.style.textDecoration = "none";
    } else if (tab === "tab-2") {
      // store in session storage as well
      sessionStorage.setItem("coder", "false");

      tab1.style.textDecoration = "none";
      tab2.style.textDecoration = "underline";
    }
  };

  return (
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
          <h2>Caching</h2>
          <p>
            Caching in CipherCrypt is handled by a Caching Server Instance that
            runs Redis. Recently, there has been some controversy concerning
            Redis in the Open Source community. Although currently, during
            development, CipherCrypt is using an older version of Redis, there
            are plenty of drop-in replacements for Redis that are available.
            Before the project launches, an alternative will be chosen for use.
          </p>
          <p>
            The purpose of Caching is to speed up data transfer. A lot of data
            is reused: the server often needs to recheck some data, the user
            might want to review the same data. Although encryption makes it
            tricky, it works wonders in increasing efficiency.
          </p>
          <p>
            Additionally, users are provided an option for increased caching.
            This allows the program to rely more on storing data temporarily in
            cache. While this speeds up the data transfer, this can increase the
            server workload.
          </p>
          <p>
            To understand more about the interactions of the Caching Server
            instance with the rest of the Technologies, please refer to the{" "}
            <A href="/about/technologies" class="inline-link">
              Core Technologies
            </A>{" "}
            section.
          </p>
        </div>
        <div class="article">
          <h2>Caching</h2>
          <h3>What is Caching?</h3>
          <p>
            Caching is when data is temporarily stored in a location that is
            fast to access. In CipherCrypt, data (such as user login data,
            encrypted passwords and notes, and so on) is stored in a database.
            The database can be fast, but is still limited by the way the
            database interacts with the hardware. Typically, databases are
            stored on a drive (HDD or SSD). Caching can mean many different
            things, but is typically stored in memory (RAM). Access to data that
            is held in memory is pretty much instant.
          </p>
          <h3>Why isn't Caching used instead of the Database?</h3>
          <p>
            Typically, caching is unreliable to use for data storage. If a
            caching server instance is shut down for any reason, everything in
            the cache is erased. However, CipherCrypt uses Redis as its caching
            server instance. Redis has a failsafe mechanism that takes
            "screenshots" of the data, which it stores on disk, so if anything
            goes wrong, the data can be recovered. While that is a neat feature,
            CipherCrypt still doesn't use Redis to replace the database. The
            application needs a database that works well with large amounts of
            data, and working with Redis with these demands becomes a challenge.
            So, Redis is used as caching.
          </p>
          <h4>
            If this is a bit difficult to understand, it might be a good idea to
            read the{" "}
            <A href="/about/technologies" class="inline-link">
              Core Technologies
            </A>{" "}
            article, especially the Caching section.
          </h4>
          <p>
            As to what it actually does, the Caching server is used to store
            data that both the Next.js server and the API servers often use.
            There is also an option that users can enable that allows more data
            to be stored in the cache at the cost of a heavier workload on the
            server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Caching;
