import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";
import ciphercrypt_tech1 from "/ciphercrypt_tech1.png";

const AboutDemo: Component = () => {
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
          <h2>How the Demo Works</h2>
          <p>
            The Demo on this website is made to be a prototype of CipherCrypt.
            It runs a separate API server (using Go), the same way that
            CipherCrypt does. There is no real advantage to doing this other
            than to demonstrate the application in its simplest form.
          </p>
          <p>
            The data is encrypted and decrypted using the API server. The data
            isn't stored anywhere on the backend, but some of it is stored in
            the local storage of your browser (goes without saying, don't enter
            any important data into the demo).
          </p>
          <h3>Timeline for Encryption</h3>
          <ol>
            <li>User inputs plaintext</li>
            <li>Plaintext is converted to JSON and sent to the API server</li>
            <li>API server encrypts the data:</li>
            <ol>
              <li>Salt is Randomly Generated</li>
              <li>Key is Hashed using PBKDF2 with the Salt</li>
              <li>Plaintext Data is converted to Bytes</li>
              <li>
                The Key Hash is converted to an AES Block (This Demo uses
                AES-128, with a 16 byte key hash)
              </li>
              <li>
                The block is wrapped in an instance of GCM (Galois Counter Mode)
              </li>
              <li>A nonce is generated for the GCM instance</li>
              <li>
                Finally, the encryption is completed with GCM using the
                generated nonce
              </li>
              <li>
                Nonce is left appended to the Ciphertext, to be discovered
                during decryption
              </li>
              <li>
                The Ciphertext, as well as the Salt (and nonce for display), are
                sent to the Browser
              </li>
            </ol>
            <li>The Data is displayed to the user</li>
            <li>
              The ciphertext and salt are stored in local storage, along with
              everything else for safekeeping (*see note below)
            </li>
          </ol>
          <h3>Timeline of Events for Decryption</h3>
          <ol>
            <li>
              User inputs key. If key is forgotten, user is forgiven and happy
              news are delivered. The key is stored in local storage (as
              mentioned before, please do not use sensitive data for anything,
              including the key)
            </li>
            <li>
              The key is sent to the API server, along with the ciphertext to
              decrypt, and the saved salt.
            </li>
            <li>The API server decrypts the data:</li>
            <ol>
              <li>
                The ciphertext is converted to bytes (was displayed as a hex
                string to user)
              </li>
              <li>
                The key and salt are returned to their primal (byte) forms
              </li>
              <li>
                The key is hashed again with PBKDF2 and the same salt, resulting
                in the same hash
              </li>
              <li>The key hash is converted to an AES Block the same way</li>
              <li>The block is wrapped in an instance of GCM</li>
              <li>
                This instance reveals the length of the nonce required for
                encryption/decryption
              </li>
              <li>
                With this information, we can separate the nonce from the
                ciphertext (step 8 of encryption)
              </li>
              <li>
                Now that the nonce is separated, the ciphertext is decrypted
                using GCM
              </li>
              <li>
                The plaintext is converted to string (from bytes) and sent to
                the user in the same form it was encrypted (JSON)
              </li>
            </ol>
            <li>The client displays the received data</li>
            <li>Encryption-Decryption loop is Complete</li>
          </ol>
          <hr class="article-break" />
          <p>
            *Feel free to look at the Local Storage, but keep in mind that if
            some of the data, like the salt, is deleted from the Local Storage
            after encryption (before being decrypted), the data will no longer
            be decrypted and you will have to start over. This might also cause
            some weird behavior, so be curious at your own risk.
          </p>
        </div>
        <div class="article">
          <h2>How the Demo Works</h2>
          <h3>What is actually happening in the Demo?</h3>
          <p>
            This project is attempting to demonstrate a sort of prototype of
            CipherCrypt. Both the actual CipherCrypt application and this
            website run on two separate servers, one for displaying this website
            and the other for handling encryption/decryption. The API server is
            written in Go, and this website is written in Javascript (using the
            Solid Start framework).
          </p>
          <p>
            During the Demo, you observed the Data being encrypted with a
            zero-knowledge encryption approach, and then decrypted. In a
            real-world application, the key that you entered in order to
            encrypt/decrypt would simply be your password. The program has no
            knowledge of your password, but uses it to encrypt and decrypt your
            data.
          </p>
          <p>
            Keep in mind, this Demo is very simple. It's to demonstrate to you
            not only how it works, but also how seemingly simple the transition
            from using the same password for everything to using a password
            manager is.
          </p>
          <p>
            More importantly, this is a demonstration to show awareness of the
            world of technologies, and that taking a small step in safekeeping
            passwords can be simpler than you thought.
          </p>
          <h3>Is any of the Data actually being stored?</h3>
          <p>
            Not by the server. The program simply encrypts the data it is given
            and sends it back. It does the same with decryption. However, the
            data is stored in the Local Storage of your Browser. Think of it
            like a cookie, but more like a miniature database that everyone has
            in their browser. That's why even if you reload, the data is still
            there.
          </p>
          <p>
            This is done for efficiency and convenience. For example, there is a
            string of bytes called a "salt". When the key is hashed and turned
            into a sort of "digital block," it needs a salt to create a hash.
            This salt is then required for decryption. So, in order to not
            inconvenience you, the salt is stored in the local storage (along
            with some other data for safekeeping). When you decrypt your data,
            the salt is retrieved and sent to the server where it can contribute
            to the decryption process.
          </p>
          <h3>
            Why is some of the data a different sort of jibberish during
            encryption?
          </h3>
          <p>
            The server sends back the ciphertext in a different format from what
            the browser can actually read. The language of the internet display
            (HTML) doesn't understand it. So, every time it doesn't understand a
            character, it is replaced by: &#xFFFD; .
          </p>
          <p>
            Unfortunately, because it becomes dismorphed, it is no longer useful
            for decryption, so the server sends both a hex version of the
            ciphertext (which can be displayed an held onto by the browser
            before sending back) and a version that looks alien-like and has no
            other purpose but to be displayed. Why do this? It looks
            interesting. Every ciphertext is unique, even if the data is the
            same.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutDemo;
