import { addRecord, saveRecord } from "./dom.js";

document.addEventListener("DOMContentLoaded", function () {
  const heightInput = document.getElementById("inputHeight");
  const weightInput = document.getElementById("inputWeight");
  const btn = document.getElementById("btn");

  // // 加載紀錄
  // loadRecords();

  btn.addEventListener("click", function () {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      Swal.fire("請輸入有效升高和體重");
      return;
    }

    const bmi = weight / (height / 100) ** 2;
    Swal.fire("`你的 BMI 是 ${bmi.toFixed(2)}`");

    if (bmi > 28.5) {
      Swal.fire({
        title: "你的 BMI 超過 28.5",
        text: "我們會為您提出飲食改善計畫。",
        icon: "warning",
        confirmButtonText: "確定",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "todo-list.html";
        }
      });
      return;
    }

    const date = new Date().toLocaleDateString();
    addRecord(date, height, weight, bmi.toFixed(2));
    saveRecord(date, height, weight, bmi.toFixed(2));
  });
});
