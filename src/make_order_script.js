document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const valueElement = counter.querySelector(".value");

    counter.querySelector(".mines").addEventListener("click", () => {
      valueElement.stepDown();
    });

    counter.querySelector(".plus").addEventListener("click", () => {
      valueElement.stepUp();
    });
  });
});
