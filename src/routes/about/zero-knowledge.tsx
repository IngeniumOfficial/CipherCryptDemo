import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import "./about.scss"

const ZeroKnowledge: Component = () => {
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

    return(
        <main>
            <Title>CipherCrypt Demo - About</Title>
            <NavBar />
            <div id="inner-main">
                <div id="sidebar-section">
                    <div id="sidebar-options" class="radio-input">
                        <div class="radio-section">
                        <input ref={coder} type="radio" id="coder" value="coder" checked name="explanation" onChange={() => localStorage.setItem("explanation", "coder")} />
                        <label for="coder">I have Coding Experience</label>
                        </div>
                        <div class="radio-section">
                        <input ref={notcoder} type="radio" id="notcoder" value="notcoder" name="explanation" onChange={() => localStorage.setItem("explanation", "notcoder")} />
                        <label for="notcoder">I want the Simple Explanation</label>
                        </div>
                    </div>
                    <div id="sidebar">
                        <A href="/about"><h1>Core Functionalities</h1></A>
                        <hr />
                        <A href="/about/zero-knowledge"><h2>Zero Knowledge Encryption</h2></A>
                        <h2>Self Hosted</h2>
                        <h2>Easy Setup</h2>
                        <h2>MongoDB Support</h2>
                        <h2>Core Technologies</h2>
                        <h2>Caching</h2>
                    </div>
                </div>
                <div class="article">
                    <p>
                        Zero-Knowledge encryption is an encryption method that uses a key that cannot be accessed by the program.
                        In other words, when the data you enter into the program is encrypted, CipherCrypt does not have any backdoor access to the data.
                    </p>
                    <h3>
                        How Does it Work?
                    </h3>
                    <p>
                        The method used by CipherCrypt is the same method used by many other companies in tech, especially those that value open source (BitWarden, Proton, etc.).
                        We simply use the password before hashing it.
                    </p>
                    <p>
                        Every <b>secure</b> system out there hashes your password when storing it in the database.
                        Let's say you sign up for an email. And let's say the password you create is 'secret123'.
                        The email provider/company uses some sort of algorithm for every password in their system. Suppose they use SHA256, which is a well known algorithm developed by the NSA.
                        When the email provider plugs in 'secret123' into the algorithm, they get the following:
                    </p>
                    <p>
                        <b>fcf730b6d95236ecd3c9fc2d92d7b6b2bb061514961aec041d6c7a7192f592e4</b>
                    </p>
                    <p>
                        Looks like a bunch of gibberish, right? But this gibberish is extremely important, since it's virtually impossible to 'decrypt' the hash back into the origin password.
                        Hackers don't even try to reverse-engineer the phrase, they use other means of trying to guess your password.
                    </p>
                    <h3>
                        So, how do you Log In?
                    </h3>
                    <p>
                        Every time you log in, the attempted log in password is generated into a new hash, and the new hash is compared to the one stored in the database of the email provider.
                        When you attempt to log in, let's say you misspelled the password and said 'secret124'. A new hash is generated and the result is <b>2f4350974680903805ab7da16a7fbe0bd358b31d7560544b82c5b6870110b2db</b>
                        Notice how this hash is different from the one mentioned earlier? Your email provider does to, and will tell you that the password entered is incorrect.
                    </p>
                    <p>
                        Also, in case you ever wondered, this is the same reason why your email can't simply tell you what your password was when you forgot it, but they still know if you're entering your old password because they have the old hash.
                    </p>
                    <p>
                        But the trick in Zero-Knowledge encryption lies in what happens before the hashing.
                        Unlike hashing (only needs an algorithm and something to hash), encryption also needs a key, because it needs to be descrypted to access the data at some point.
                        So, when CipherCrypt generates a hash for your password 'secret123' to store the hash in the database, the plain-text version of your password (secret123) is used as the key to encrypt your data.
                    </p>
                    <p>
                        Using this method is the simplest way to achieve Zero-Knowledge encryption.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default ZeroKnowledge;