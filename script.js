document.addEventListener("DOMContentLoaded", function () {
  const bmiForm = document.getElementById("bmi-form");
  const heightInput = document.getElementById("inputHeight");
  const weightInput = document.getElementById("inputWeight");
  const btn = document.getElementById("btn");
  const recordTableBody = document.querySelector("#recordTable tbody");

  // 加載紀錄
  loadRecords();

  btn.addEventListener("click", function () {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert("請輸入有效升高和體重");
      return;
    }

    const bmi = weight / (height / 100) ** 2;
    alert(`你的 BMI 是 ${bmi.toFixed(2)}`);

    const date = new Date().toLocaleDateString();
    addRecord(date, height, weight, bmi.toFixed(2));

    if (bmi > 28.5) {
      alert("你的 BMI 超過 30，我們會為您提出緊實改善計畫。");
      window.location.href = "todo-list.html";
    }
  });

  function addRecord(date, height, weight, bmi) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${date}</td>
      <td>${height}</td>
      <td>${weight}</td>
      <td>${bmi}</td>`;
    recordTableBody.appendChild(row);
  }
});
