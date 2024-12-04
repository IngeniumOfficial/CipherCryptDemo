import { Ref, createSignal, onMount } from "solid-js";
import type { Component } from "solid-js";
// @ts-ignore
import * as d3 from "d3";

const DecriptionAnimation: Component<{
  encryptedData: any;
  decryptedData: any;
}> = (props) => {
  let enc = props.encryptedData;
  let dec = props.decryptedData;

  if (props.encryptedData.ciphertext === "")
    enc = JSON.parse(localStorage.getItem("encData")!);
  if (props.decryptedData.plaintext === "")
    dec = JSON.parse(localStorage.getItem("decData")!);

  // // Set up the SVG
  // const svg = d3
  //   .select("body")
  //   .append("svg")
  //   .attr("width", 800)
  //   .attr("height", 600);

  // // Prepare the block data
  // const blockSize = 128; // bits
  // const numBlocks = 10;
  // const blockData = Array(numBlocks)
  //   .fill(0)
  //   .map((_, i) => ({
  //     id: i,
  //     encrypted: `Block ${i} (Encrypted)`,
  //     decrypted: `Block ${i} (Decrypted)`,
  //   }));

  // // Draw the block grid
  // const blocks = svg
  //   .selectAll("rect")
  //   .data(blockData)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d, i) => i * 50)
  //   .attr("y", 50)
  //   .attr("width", 40)
  //   .attr("height", 40)
  //   .attr("fill", "gray");

  // // Animate the decryption process
  // blocks
  //   .transition()
  //   .duration(2000)
  //   .attr("fill", "green")
  //   .text((d) => d.decrypted);

  return (
    <div id="decription-animation">
      <div id="encrypted-vis"></div>
      <div id="decrypted-vis"></div>
    </div>
  );
};

export default DecriptionAnimation;
