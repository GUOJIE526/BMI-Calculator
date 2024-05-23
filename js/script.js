import { addRecord } from "./dom.js";

document.addEventListener("DOMContentLoaded", function () {
  const heightInput = document.getElementById("inputHeight");
  const weightInput = document.getElementById("inputWeight");
  const btn = document.getElementById("btn");

  btn.addEventListener("click", function () {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      Swal.fire("請輸入有效身高和體重");
      return;
    }

    const bmi = weight / (height / 100) ** 2;
    if (bmi >= 28.5) {
      Swal.fire({
        title: "你的BMI超過28！",
        Text: "我們將為您提出瘦身改事件畫。",
        icon: "warning",
        confirmButtonText: "確定",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "plan.html";
        }
      });
    } else {
      Swal.fire(`你的 BMI 是 ${bmi.toFixed(2)}`);
    }

    const date = new Date().toLocaleDateString();
    addRecord(date, height, weight, bmi.toFixed(2));
  });
});
