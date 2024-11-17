import { RouteSectionProps, A } from "@solidjs/router";
import { onMount, Ref } from "solid-js";

import { Title } from "@solidjs/meta";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";

import "./about.scss";
import "picnic/picnic.min.css";

export default function AboutLayout(props: RouteSectionProps) {
  return (
    <main>
      <Title>About - CipherCrypt</Title>
      <NavBar />
      {props.children}
      <Footer />
    </main>
  );
}
