import type { Component, Setter, Accessor } from 'solid-js'
import { animals, animals2, exoticAnimals } from './data'

const DemoToolBar: Component<{dataSignal: Accessor<any>,  dataSignalSet: Setter<any>, updateLS: () => void, loadingSet: Setter<any>}> = (props) => {

    const generateRandom = (quantity: number = 1) => {
        console.log(quantity)
        let randomAnimal1 = animals[Math.floor(Math.random() * 15)];
        let randomAnimal2 = animals2[Math.floor(Math.random() * 15)];
        let randomAnimal3 = exoticAnimals[Math.floor(Math.random() * 15)];

        // Check if the dataSignal contains an object with the same username
        if(props.dataSignal().length > 0) {
            let arr = props.dataSignal();

            for(let i = 0; i < arr.length; i++) { // Check the entire array for a match
                if(arr[i].username === randomAnimal1) { // If a match is found, regenerate until no match
                    
                    let newRandom1 = animals[Math.floor(Math.random() * 15)];
                    while(arr[i].username === newRandom1) { // If the match is found, generate a new one
                        newRandom1 = animals[Math.floor(Math.random() * 15)];
                    }
                    randomAnimal1 = newRandom1;
                }

                if (arr[i].username === randomAnimal2) { // Same thing here

                    let newRandom2 = animals2[Math.floor(Math.random() * 15)];
                    while(arr[i].username === newRandom2) {
                        newRandom2 = animals2[Math.floor(Math.random() * 15)];
                    }
                    randomAnimal2 = newRandom2;
                }

                if (arr[i].username === randomAnimal3) { // Same thing here

                    let newRandom3 = exoticAnimals[Math.floor(Math.random() * 15)];
                    while(arr[i].username === newRandom3) {
                        newRandom3 = exoticAnimals[Math.floor(Math.random() * 15)];
                    }
                    randomAnimal3 = newRandom3;
                }
            }

            props.dataSignalSet((prev) => [...prev, randomAnimal1]);

            if(quantity === 3) { // If quantity is 3, add the other two
                props.dataSignalSet((prev) => [...prev, randomAnimal2]);
                props.dataSignalSet((prev) => [...prev, randomAnimal3]);
            }
        } else {
            props.loadingSet('good');
            console.log("Adding one", randomAnimal1)
            props.dataSignalSet([randomAnimal1]); // If dataSignal is empty, add one

            if(quantity === 3) { // If quantity is 3, add the other two
                console.log("Adding two")
                props.dataSignalSet((prev) => [...prev, randomAnimal2]);
                props.dataSignalSet((prev) => [...prev, randomAnimal3]);
            }
        }

        props.updateLS();
    }

    return(
        <div id="demo-toolbar">
            <h4 class='toolbar-buttons' onClick={() => generateRandom()}>Generate Random Password</h4>
            <h4 class='toolbar-buttons' onClick={() => generateRandom(3)}>Generate 3 Passwords</h4>
            <h4 class='toolbar-buttons'>Side-By-Side</h4>
        </div>
    )
}

export default DemoToolBar;