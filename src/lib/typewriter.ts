type Options = {
  strings: string[]; // Strings are in an array, no backtyping
  typeSpeed?: number; // Type speed in milliseconds, passed to setTimeout or setInterval [default: 100]
  skipChunkMin?: number; // When low typespeed is not enough (or just for the heck of it), you can choose to skip this many characters at a time [default: none]
  skipChunkMax?: number; // If this option is not set but skipChunkMin is, skipChunkMax will be set to skipChunkMin (skipping chunks will be consistent). Otherwise, it will randomly pick a number between skipChunkMin and skipChunkMax (skipping chunks will be randomized)
  onComplete?: () => any; // Optional callback to run when typing is complete
  outputType?: string; // Output type [default: text], can be text, html, or value
};

export default class Typewriter {
  private elementId: string;
  private options: Options;
  private onComplete: () => any;
  constructor(elementId: string, options: Options) {
    this.elementId = elementId;
    this.options = options;
    this.onComplete = options.onComplete || (() => {});
  }

  run() {
    const element = document.getElementById(this.elementId);
    if (!element) return console.error("Element not found");

    let minChunk = this.options.skipChunkMin;
    let maxChunk = this.options.skipChunkMax;
    let i = 0;
    let index = 0;
    let subdivided: string[] = [];
    let outputType = this.options.outputType || "text";

    function displayNextString(this: Typewriter) {
      if (i >= this.options.strings.length) {
        this.onComplete();
        return;
      }

      // Find out if string needs to be subdivided
      if (typeof this.options.skipChunkMin !== "undefined") {
        if (typeof this.options.skipChunkMax === "undefined") {
          let str = this.options.strings[i];
          for (let i = 0; i < str.length; i += minChunk!) {
            const chunk = str.slice(i, Math.min(i + minChunk!, str.length));
            subdivided.push(chunk);
          }
        } else {
          // Both skipChunkMin and skipChunkMax are defined
          let str = this.options.strings[i];
          let maxSkip = this.options.skipChunkMax;
          let minSkip = this.options.skipChunkMin;
          let j = 0;
          while (j < str.length) {
            const skipLength =
              Math.floor(Math.random() * (maxSkip - minSkip + 1)) + minSkip;
            subdivided.push(str.slice(j, j + skipLength));
            j += skipLength;
          }
        }
      } else {
        subdivided = [...this.options.strings[i].split("")];
      }

      index = 0;

      const innerIntervalId = setInterval(() => {
        if (index < subdivided.length) {
          if (outputType === "value") {
            (element as HTMLInputElement).value += subdivided[index];
          } else if (outputType === "html") {
            element!.innerHTML += subdivided[index];
          } else {
            element!.innerText += subdivided[index];
          }
          index++;
        } else {
          clearInterval(innerIntervalId);
          i++;
          subdivided = [];
          displayNextString.call(this); // Call the next string
        }
      }, this.options.typeSpeed || 100);
    }

    displayNextString.call(this);
  }
}
