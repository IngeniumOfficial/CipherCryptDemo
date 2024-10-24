import { createSignal, onMount } from "solid-js";
import type { Component } from 'solid-js'

const DemoEncrypted: Component<{ plainText: string }> = (props) => {
    const [encryptedData, encryptedDataSet] = createSignal<string>("")
    
    onMount(() => {
        
    })

    return(
        <div id="demo-encrypted">
            
        </div>
    )
}

export default DemoEncrypted