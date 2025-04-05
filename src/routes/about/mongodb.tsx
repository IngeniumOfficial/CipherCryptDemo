import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";

const MongoDB: Component = () => {
  let mdb: any;
  let tab1: any;
  let tab2: any;

  onMount(() => {
    if (sessionStorage.getItem("coder") === "false") {
      tab2.click();
    } else {
      tab1.click();
    }
  });

  const toggleUnderline = (tab: string) => {
    if (tab === "tab-1") {
      //session storage
      sessionStorage.setItem("coder", "true");

      tab1.style.textDecoration = "underline";
      tab2.style.textDecoration = "none";
    } else if (tab === "tab-2") {
      //session storage
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
          <h2>MongoDB Support</h2>
          <p>
            Although PostgreSQL is in development, the first target is MongoDB.
          </p>
          <p>
            The feud in benchmarking between PostgreSQL and MongoDB is
            inconclusive (although a majority of benchmarks tend to go in the
            favor os PostgreSQL). But in our case, it was a matter of
            simplicity. MongoDB is still fast, is just as ACID compliant as
            PostgreSQL, and has a bigger focus on document storage. Sure, it
            might not do certain joins as efficiently or intuitively, but even
            the planned social side of CipherCrypt is not demanding enough to
            need an immediate start with SQL. That being said, MongoDB is
            treated separately from CipherCrypt and any connection to it is
            allowed, whether local or remote. So, for now, it's the primary
            option, but adding an option like PostgreSQL is absolutely planned.
          </p>
          <p>
            Another alternative that was considered is Redis. I am aware that
            there is some controversy that occured with Redis concerning their
            license, so while development is currently being done with an older
            version of Redis, the product will probably be made with a newer
            version of one of its alternatives, which are well maintained and
            open source (Valkey, Dragonfly, Redict, KeyDB, etc.). While an
            in-memory database is something that might throw some people off,
            the innovations in the sphere of in-memory databases, such as Redis,
            have made it possible to do this without big risk. A system like
            Redis is able to make copies of data and restore it if an issue with
            memory comes up.
          </p>
          <p>
            <b>The pros?</b> It's fast. And when compared to a traditional
            database, it's not even close. It's extremely efficient, and very
            robust.
          </p>
          <p>
            <b>The cons?</b> It's lacks the data-heavy capabilities of Document
            and SQL databases. Nested data can be stored in a single value as a
            JSON string, but as the complexity of developing the project grows,
            so does the complexity of storing data in something like Redis.
          </p>
          <p>
            So, instead, CipherCrypt just uses MongoDB as the database, and
            "Redis" as the cache for many tasks.
          </p>
        </div>
        <div class="article">
          <h2>MongoDB Support</h2>
          <h3>What is MongoDB?</h3>
          <p>
            MongoDB is an open source, document database. Unlike the{" "}
            <A href="/about/caching" class="inline-link">
              Caching Server Instance
            </A>
            , MondoDB stores data on a disk driver rather than in memory. It
            stores absolutely everything that it can (user login credentials for
            authentication, user data, encrypted data for decryption, etc.).
          </p>
          <p>
            The reason for choosing MongoDB over its alternatives is because of
            its simplicity in using it as a document storage. A popular
            alternative is an SQL (relational) database, but the strengths of
            SQL aren't as big of a necessity for CipherCrypt at the moment.
          </p>
          <p>
            However, MongoDB needs to be installed and "attached" to CipherCrypt
            during setup. The program doesn't care whether the connection is to
            a local instance (actually running alonside the server) or a remote
            connection (using a url to connect). This subtle difference carries
            security implications, so keep that in mind when setting up the
            connection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MongoDB;
