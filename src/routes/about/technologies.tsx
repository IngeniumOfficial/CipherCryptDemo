import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";
// import ciphercrypt_tech1 from "/ciphercrypt_tech1.png";

const Technologies: Component = () => {
  let tech: any;

  let tab1: any;
  let tab2: any;

  onMount(() => {
    tech.classList.add("active");
    tech.style.color = "#b2dcc9";
    tech.style.textDecoration = "underline";

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
    <div id="inner-main">
      <div id="sidebar-section">
        <A href="/about/about-general" class="pseudo button">
          <h2>About CipherCrypt</h2>
        </A>
        <hr />
        <div id="sidebar-tabs">
          <A href="/about/zero-knowledge" class="pseudo button">
            Zero-knowledge encryption
          </A>
          <A href="/about/self-hostable" class="pseudo button">
            Self-hosted
          </A>
          <A href="/about/no-experience" class="pseudo button">
            Guided Setup: No Experience Required
          </A>
          <A href="/about/caching" class="toggle pseudo button">
            Built-in Caching
          </A>
          <A href="/about/technologies" ref={tech} class="toggle pseudo button">
            Powerful Technologies
          </A>
          <A href="/about/mongodb" class="toggle pseudo button">
            MongoDB support
          </A>
        </div>
      </div>
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
            <h2>Core Technologies</h2>
            <p>
              To help better understand the where everything is in the chain of
              internal technologies, look at the image below:
            </p>
            <img
              src="/ciphercrypt_tech1.png"
              alt="The CipherCrypt core technologies consist of a Web/Display Server for serving the data, a Go API server for handling the main workload of the application,
        a caching server instance for increasing efficiency in data transfer, and an open database connection."
            ></img>
            <h3>Web (Display) Server</h3>
            <p>
              CipherCrypt runs two separate servers. This is intentional. The
              Web Server has the primary purpose of being...a web server (as you
              may have guessed). Initially, the idea was to have the API server
              (using Go) handle both display and heavy workloads of encryption,
              decryption, hashing, etc. Next.js was still used, but only to
              generate the website statically and allow the Go server to do
              everything else. As the project progressed, it became clear that
              the tech around Next.js is centered around Node.js, and issues
              with using it with Go kept coming up. Alternatives to Next.js were
              also considered, but even the alternatives typically relied on a
              javascript runtime as a backend. The goal of a good frontend
              technology for this project is efficiency and simplicity, so it
              became clear that the two should be split into separate servers.
            </p>
            <p>
              This split doesn't decrease the speed of data transfer in any
              meaningful capacity, but it can cater to different needs a lot
              more efficiently. Additionally, the Node.js server is used to
              handle many less-intense tasks (logging, some authorization,
              reading cache, etc.).
            </p>
            <h4>Why Next.js in the first place?</h4>
            <p>
              Many alternatives were considered. However, ultimately Next.js fit
              the picture best because the open API system (see below) allows
              for a (currently planned) React-Native App. Using React by itself
              and expecting efficiency is not the smart thing to do. Although
              it's possible to implement SSR without using a framework around
              React, the alternatives make this task much easier. In this
              moment, the two options are Astro.js and Next.js. Although Astro
              caters itself to content-heavy projects, it's just as good for
              anything requiring performance. However, Next.js is quite
              literally centered around React (and doesn't use another language
              as its base), and has the same (although not as specific)
              rendering features as Astro.
            </p>
            <h3>Go API Server</h3>
            <p>
              The Go API server does the heavy lifting of the program. It
              handles encryption, authentication, hashing, and more. Using Go
              for this project allows for a simple approach in concurrently
              executing multiple tasks. The API server runs on its own subdomain
              (api.example.com), and displays a web page with some information,
              as well as a schema for an API system that developers can use for
              their own projects.
            </p>
            <p>
              The Go API server uses the Gin-Gonic framework for handling HTTP
              requests and serving static files.
            </p>
            <h3>Caching Server Instance</h3>
            <p>
              This project was writted with Redis in mind. During the
              development, there was a controversy around Redis and its place in
              the Open Source community. So, while the development has been over
              an older version of Redis, the production instance will be catered
              to an alternative (drop-in replacement) for Redis, such as Valkey,
              Redict, or one of the multiple other options. The Caching server
              instance is there to cache data that is often reused, and in some
              instances, is minorly changes. Users are given the option to
              enable increased caching. This option allows for faster data
              transfer, but can increase the workload of the application.
            </p>
            <h3>Database Connection</h3>
            <p>
              The Database Connection is an open connection between the API
              server and the primary Database. The Database Connection currently
              only connects to a MongoDB instance, but it doesn't care for the
              connection itself. The person setting up the project is in charge
              of connection the database, whether it be a local or remote
              instance. This can have security implications, so it's important
              to be aware of it. The MongoDB instance stores EVERYTHING in it,
              so keep in mind when handling populated databases if tinkering
              with the project.
            </p>
          </div>
          <div class="article">
            <h2>Core Technologies</h2>
            <p>
              To help better understand the where everything is in the chain of
              internal technologies, look at the image below:
            </p>
            <img
              src="/ciphercrypt_tech1.png"
              alt="The CipherCrypt core technologies consist of a Web/Display Server for serving the data, a Go API server for handling the main workload of the application, 
                    a caching server instance for increasing efficiency in data transfer, and an open database connection."
            ></img>
            <h3>Web (Display) Server</h3>
            <p>
              CipherCrypt uses two separate servers to organize its work
              efficiently. Initially, the plan was for one server to handle
              everything: showing the website and performing complicated
              security tasks like encrypting and decrypting data. The website is
              built using a tool called Next.js, while a language called Go
              handles the security tasks. However, pluggin in a website made by
              Next.js into a Go server didn't work too well. Alternative
              solutions also relied on JavaScript, which didn't fit the
              project's needs. To simplify things, the work is split between two
              separate servers:
            </p>
            <ol>
              <li>
                The Web Server (Next.js/Node.js) focuses on displaying the
                website.
              </li>
              <li>
                The API Server (Go/Gin-Gonic) handles the complicated security
                tasks.
              </li>
            </ol>
            <p>
              This setup allows each server to do its job efficiently.
              Additionally the Web Server (Node.js) is given many other
              less-intense tasks to perform (logging, some authorization,
              reading cache, etc.).
            </p>
            <h3>API Server</h3>
            <p>
              CipherCrypt's API server, powered by Go, takes care of the complex
              tasks. It securely handles:
            </p>
            <ul>
              <li>Encryption</li>
              <li>Authentication</li>
              <li>Hashing</li>
              <li>Other security tasks</li>
            </ul>
            <p>
              Using Go makes it easy to perform multiple tasks simultaneously,
              improving efficiency. The API server has its own address
              api.example.com and displays a webpage with helpful information
              and a blueprint (schema) for developers to integrate CipherCrypt's
              features into their own projects. This setup provides a secure and
              accessible foundation for developers to build upon, or to
              experiment with.
            </p>
            <h3>Caching Server Instance</h3>
            <p>
              CipherCrypt was designed to work with Redis, a data storage
              system, as a Caching solution. However, recently there have been
              some controversies around Redis and its place in the Open Source
              community. As a result, the production version will switch to an
              alternative solution that works similarly to Redis, such as Valkey
              or Redict. The Caching Server plays a key role in:
            </p>
            <ul>
              <li>Storing frequently used data</li>
              <li>Updating data that rarely changes or changes minimally</li>
            </ul>
            <p>
              Additionally, users have the option to enable increased caching,
              which lets the Caching server instance handle more data. This can
              speed up the data transfer, but can also increase the
              application's workload (can give negative performance if many
              people are using the application).
            </p>
            <h3>Database Connection</h3>
            <p>
              Note: A database is like a digital filing cabinet where
              information is stored and organized. It allows programs like
              CipherCrypt to access and manage data efficiently. CipherCrypt
              needs a database to store its information. The database connection
              is like a bridge between the API server and the database. To set
              up CipherCrypt, you need to connect it to a database. This can be:
            </p>
            <ul>
              <li>A database that runs alongside the program (local)</li>
              <li>A database hosted online (like Mongo Atlas)</li>
            </ul>
            <p>
              Think of it like connecting to a cloud storage service, but
              instead of storing files, you're storing data. It's important to
              set up the connection securely to protect your data.
            </p>
            <p>
              The database stores all of CipherCrypt's information. Be careful
              when tinkering/experimenting with it to avoid losing or damaging
              data. Think of it like a filing cabinet:
            </p>
            <ul>
              <li>The database is the cabinet</li>
              <li>The connection is the key to accessing the cabinet</li>
            </ul>
            <p>
              Setting up the database may be confusing, but we will have a guide
              on how to do this.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
