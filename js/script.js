import { BMI, initrecords } from "./dom.js";

const bmiButton = document.getElementById("btn");
bmiButton.addEventListener("click", BMI);

document.addEventListener("DOMContentLoaded", function () {
  initrecords();
});
