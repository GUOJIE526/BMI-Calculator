import { BMI, initrecords } from "./bmi.js";

const bmiButton = document.getElementById("btn");
bmiButton.addEventListener("click", BMI);

document.addEventListener("DOMContentLoaded", function () {
  initrecords();
});
