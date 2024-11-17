import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
// import symmetricEncryption from "/symmetricEncryption.webp";

const ZeroKnowledge: Component = () => {

    return(
                    <div class="article">
                        <h2>Zero-Knowledge Encryption</h2>
                        <h3>Let's Look at Encryption</h3>
                        <p>
                            Encryption is the process of converting data into ciphertext, which is unreadable and can only (ideally) be decrypted by the same person who encrypted it.
                            There are many algorithms that can be used to encrypt/decrypt data, developed by various companies, organizations, and even government agencies.
                        </p>
                        <p>
                            Take a look at the visualization of how (symmetric) encryption works.
                        </p>
                        <img src="/symmetricEncryption.webp" />
                        <p>
                            There are other types of encryption, such as asymetric encryption (where the key to encrypt is different than the key to decrypt), hash-based encryption, and more.
                            CipherCrypt uses an asymmetric model of encryption, but for simplicity, we will focus on symmetric encryption.
                        </p>
                        <p>
                            When you enter data, such as a password or a note, into the program, it is encrypted. Then, when you change the data or just need to access it to view it, the program decrypts it and shows it to you.
                        </p>
                        <h3>
                            What is Zero-Knowledge Encryption?
                        </h3>
                        <p>
                            Zero-Knowledge encryption takes encryption a step further. The program uses a key that it has no way of knowing. There is literally no way for the program to spy on the user.
                        </p>
                        <h3>
                            How Does it Work?
                        </h3>
                        <p>
                            The method used by CipherCrypt is the same method used by many other companies in tech, especially those that value open source (BitWarden, Proton, etc.).
                            We simply use the password before hashing it.
                        </p>
                        <p>
                            Most <b>secure</b> systems use the following approach to passwords for login and signup: the password is hashed (cannot be reversed) and stored in the database.
                            Suppose you sign up with the password 'secret123'. The program doesn't know the password. It puts it into a hashing algorithm (which, unlike encryption, cannot be reversed) and stores the hash in the database.
                            When you attempt to log in, it generates a new hash using the password you entered for login, and compares that hash with the one in the database, and if they match, the login is successful.
                        </p>
                        <p>
                            By hashing the password, the program never knows the original password. This is also the reason why your gmail can't tell you your password, why they only let you change it, and why they know if the new password is the same as the old one.
                            The beauty of this is that even if a hacker gets access to the database, they can't reverse engineer your password, and resort to other means of guessing it.
                        </p>
                        <p>
                            So, since all these professional systems don't know the password, we can use before it gets hashed as the key to encrypt the data. Clever, right?
                            The password is carried in the request, where it does both, authenticates you as a user, and encrypts the data...all without letting the program know a single thing.
                        </p>
                        <p>
                            Using this method is the simplest way to achieve Zero-Knowledge encryption.
                        </p>
                    </div>
                    // <div class="article">
                    //     <h2>Zero Knowledge Encryption</h2>
                    //     <p>
                    //         CipherCrypt uses the most popular way of implementing Zero-Knowledge Encryption, by using the password as the encryption key before hashing it and storing in the database.
                    //     </p>
                    //     <p>
                    //         This method is simple and effective, and is used by many companies out there (BitWarden, Proton, etc.).
                    //     </p>
                    //     <p>
                    //         Zero-Knowledge encryption is important, even if you are hosting CipherCrypt on your own server.
                    //         Aside from the fact that you might entrust your server to other people for use (and future development might even encourage this),
                    //         zero-knowledge encryption is useful against many security threats. If no one but the account user can decrypt their own data,
                    //         that is a layer of protection against malicious actors.
                    //     </p>
                    //     <p>
                    //         For more information, see: <a href="https://en.wikipedia.org/wiki/Zero-knowledge_protocol">Wikipedia</a>
                    //     </p>
                    // </div>
    )
}

export default ZeroKnowledge;