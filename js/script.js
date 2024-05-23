<<<<<<< HEAD
import { addRecord } from "./dom.js";
=======
import { addRecord, saveRecord } from "./dom.js";
>>>>>>> 6e4129148910a5f5f8428f71beb48103d08944b8

document.addEventListener("DOMContentLoaded", function () {
  const heightInput = document.getElementById("inputHeight");
  const weightInput = document.getElementById("inputWeight");
  const btn = document.getElementById("btn");

<<<<<<< HEAD
=======
  // // 加載紀錄
  // loadRecords();

>>>>>>> 6e4129148910a5f5f8428f71beb48103d08944b8
  btn.addEventListener("click", function () {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
<<<<<<< HEAD
      Swal.fire("請輸入有效身高和體重");
=======
      Swal.fire("請輸入有效升高和體重");
>>>>>>> 6e4129148910a5f5f8428f71beb48103d08944b8
      return;
    }

    const bmi = weight / (height / 100) ** 2;
<<<<<<< HEAD
    if (bmi >= 28.5) {
      Swal.fire({
        title: "你的BMI超過28！",
        Text: "我們將為您提出瘦身改事件畫。",
=======
    Swal.fire("`你的 BMI 是 ${bmi.toFixed(2)}`");

    if (bmi > 28.5) {
      Swal.fire({
        title: "你的 BMI 超過 28.5",
        text: "我們會為您提出飲食改善計畫。",
>>>>>>> 6e4129148910a5f5f8428f71beb48103d08944b8
        icon: "warning",
        confirmButtonText: "確定",
      }).then((result) => {
        if (result.isConfirmed) {
<<<<<<< HEAD
          window.location.href = "plan.html";
        }
      });
    } else {
      Swal.fire(`你的 BMI 是 ${bmi.toFixed(2)}`);
=======
          window.location.href = "todo-list.html";
        }
      });
      return;
>>>>>>> 6e4129148910a5f5f8428f71beb48103d08944b8
    }

    const date = new Date().toLocaleDateString();
    addRecord(date, height, weight, bmi.toFixed(2));
<<<<<<< HEAD
=======
    saveRecord(date, height, weight, bmi.toFixed(2));
>>>>>>> 6e4129148910a5f5f8428f71beb48103d08944b8
  });
});
