import type { Component, Setter, Accessor } from "solid-js";
import { animals, animals2, exoticAnimals } from "./data";
import { updateLS } from "./utils_ls";

const DemoToolBar: Component<{
  dataSignal: Accessor<any>;
  dataSignalSet: Setter<any>;
  loadingSet: Setter<any>;
}> = (props) => {
  const generateRandom = (quantity: number = 1) => {
    let randomAnimal1 = animals[Math.floor(Math.random() * 15)];
    let randomAnimal2 = animals2[Math.floor(Math.random() * 15)];
    let randomAnimal3 = exoticAnimals[Math.floor(Math.random() * 15)];

    // Check if there are already 10 entries in dataSignal
    if (props.dataSignal().length >= 10) {
      alert("Maximum number of entries reached");
      return;
    }

    // Check if the dataSignal contains an object with the same username
    if (props.dataSignal().length > 0) {
      let arr = props.dataSignal();

      // Check if the dataSignal contains an object with the same username
      while (arr.includes(randomAnimal1)) {
        randomAnimal1 = animals[Math.floor(Math.random() * 15)];
      }

      while (arr.includes(randomAnimal2)) {
        randomAnimal2 = animals2[Math.floor(Math.random() * 15)];
      }

      while (arr.includes(randomAnimal3)) {
        randomAnimal3 = exoticAnimals[Math.floor(Math.random() * 15)];
      }

      props.dataSignalSet((prev) => [...prev, randomAnimal1]);

      if (quantity === 3) {
        // If quantity is 3, add the other two
        props.dataSignalSet((prev) => [...prev, randomAnimal2]);
        props.dataSignalSet((prev) => [...prev, randomAnimal3]);
      }
    } else {
      props.loadingSet("good");
      console.log("Adding one", randomAnimal1);
      props.dataSignalSet([randomAnimal1]); // If dataSignal is empty, add one

      if (quantity === 3) {
        // If quantity is 3, add the other two
        console.log("Adding two");
        props.dataSignalSet((prev) => [...prev, randomAnimal2]);
        props.dataSignalSet((prev) => [...prev, randomAnimal3]);
      }
    }

    updateLS(props.dataSignal());
  };

  return (
    <div id="demo-toolbar">
      <button onClick={() => generateRandom()}>Generate Random Password</button>
      <button onClick={() => generateRandom(3)}>Generate 3 Passwords</button>
      <button>Side-By-Side</button>
    </div>
  );
};

export default DemoToolBar;
