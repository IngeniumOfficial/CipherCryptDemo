import type { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal, onMount, Ref, Show } from "solid-js";

const MongoDB: Component = () => {

    return(
                <div class="article">
                    <h2>MongoDB Support</h2>
                    <h3>What is MongoDB?</h3>
                    <p>
                      MongoDB is an open source, document database. Unlike the <A href="/about/caching" class="inline-link">Caching Server Instance</A>, MondoDB stores data on a disk driver rather than in memory.
                      It stores absolutely everything that it can (user login credentials for authentication, user data, encrypted data for decryption, etc.).
                    </p>
                    <p>
                      The reason for choosing MongoDB over its alternatives is because of its support for nested and large data. A popular alternative is an SQL (relational) database, but the strengths of SQL aren't applicable to CipherCrypt.
                      Additionally, MongoDB is much faster and more efficient than SQL databases.
                    </p>
                    <p>
                      However, MongoDB needs to be installed and "attached" to CipherCrypt during setup. The program doesn't care whether the connection is to a local instance (actually running alonside the server) or a remote connection (using a url to connect).
                      This subtle difference carries security implications, so keep that in mind when setting up the connection.
                    </p>
                </div>
                  // <div class="article">
                  //     <h2>MongoDB Support</h2>
                  //     <p>
                  //         At the moment only MongoDB is supported for this project. While there are potential plans to expand to other databases (such as PostgreSQL), MongoDB is much better fitted for this project for the following reasons:
                  //     </p>
                  //     <p>
                  //         When compared to SQL (PostgreSQL), it becomes clear that MongDB is more efficient and simpler than SQL in everything relevant. And in the areas where SQL is more efficient, it becomes unnecessary overkill for a project like CipherCrypt.
                  //         MongoDB is faster, is just as ACID compliant as PostgreSQL, more data oriented, and performs many relational operations more efficiently.
                  //         Sure, it might not do certain joins as efficiently or intuitively, but even the planned social side of CipherCrypt is not demanding enough to need an immediate change to SQL.
                  //         That being said, MongoDB is treated separately from CipherCrypt and any connection to it is allowed, whether local or remote. So, for now, it's the only option, but adding an alternative database is still very much on the table.
                  //     </p>
                  //     <p>
                  //         Another alternative that was considered is Redis. I am aware that there is some controversy that occured with Redis concerning their license, so while development is currently being done with an older version of Redis,
                  //         the product will probably be made with a newer version of one of its alternatives, which are well maintained and open source (Valkey, Dragonfly, Redict, KeyDB, etc.).
                  //         While an in-memory database is something that might throw some people off, the innovations in the sphere of in-memory databases, such as Redis, have made it possible to do this without big risk.
                  //         A system like Redis will use an advance technique to make copies of data and restore it if anything goes wrong.
                  //     </p>
                  //     <p>
                  //         <b>The pros?</b> It's fast. And when compared to a traditional database, it's not even close. It's extremely efficient, and very robust.
                  //     </p>
                  //     <p>
                  //         <b>The cons?</b> It's lacks the data-heavy capabilities of MongoDB (or even SQL). Nested data can be stored in a single value as a JSON string, but as the complexity of developing the project grows, so does the complexity of storing data in something like Redis.
                  //     </p>
                  //     <p>
                  //         So, instead, CipherCrypt just uses MongoDB as the database, and "Redis" as the cache for many tasks.
                  //     </p>
                  // </div>
    )
}

export default MongoDB;