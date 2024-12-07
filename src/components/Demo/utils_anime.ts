// @ts-ignore
import anime from "animejs";

type mLARResult = {
  complete: boolean;
};

// Move specific component left and away, and bring another component from right
const moveLeftAddRight = (
  componentLeft: string,
  componentRight: string
): Promise<mLARResult> => {
  return new Promise((resolve, reject) => {
    let leftEl = document.getElementById(componentLeft);
    let rightEl = document.getElementById(componentRight);

    let result = {
      complete: false,
    };

    let duration = 600;
    anime({
      targets: leftEl,
      translateX: "-500px",
      opacity: 0,
      duration: duration,
      easing: "cubicBezier(.5, .05, .1, .3)",
    });
    setTimeout(() => {
      leftEl!.style.display = "none";
      rightEl!.style.display = "flex";
      anime({
        targets: rightEl,
        translateX: "-500px",
        opacity: 1,
        duration: duration,
        easing: "cubicBezier(.5, .05, .1, .3)",
      });

      result.complete = true;
      resolve(result);
    }, duration + 50);
  });
};

export { moveLeftAddRight };
export type { mLARResult };
