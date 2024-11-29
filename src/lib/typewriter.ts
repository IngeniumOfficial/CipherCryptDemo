type Options = {
  strings: string[]; // Strings are in an array, no backtyping
  typeSpeed?: number; // Type speed in milliseconds, passed to setTimeout or setInterval [default: 100]
  skipChunkMin?: number; // When low typespeed is not enough (or just for the heck of it), you can choose to skip this many characters at a time [default: none]
  skipChunkMax?: number; // If this option is not set but skipChunkMin is, skipChunkMax will be set to skipChunkMin (skipping chunks will be consistent). Otherwise, it will randomly pick a number between skipChunkMin and skipChunkMax (skipping chunks will be randomized)
  onComplete?: () => any; // Optional callback to run when typing is complete
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

    console.log("Running typewriter");
    console.log("Options: ", this.options);
    let minChunk = this.options.skipChunkMin;
    let maxChunk = this.options.skipChunkMax;

    for (let i = 0; i < this.options.strings.length; i++) {
      console.log("String: ", this.options.strings[i]);
      let subdivided: string[] = [];
      // Find out if string needs to be subdivided
      if (typeof this.options.skipChunkMin !== "undefined") {
        console.log("Subdividing string preset");
        if (typeof this.options.skipChunkMax === "undefined") {
          console.log("Setting skipChunkMax to skipChunkMin");
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
      }

      console.log("Subdivided: ", subdivided);

      if (subdivided.length === 0) {
        console.log("Not subdividing string");
        subdivided = [...this.options.strings[i].split("")];
      }

      // Loop over the subdivided strings and display them
      let index = 0;
      let callback = this.onComplete;
      function runDisplay() {
        if (index < subdivided.length) {
          console.log("Displaying: ", subdivided[index]);
          element!.innerHTML += subdivided[index];
          index++;
        } else {
          clearInterval(id);
          callback();
        }
      }

      const id = setInterval(runDisplay, this.options.typeSpeed || 100);
    }
  }
}
