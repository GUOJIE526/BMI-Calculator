let recordsList = [];

const STATE_KEY = "bmirecods";

function loadRecord(){
  const recordsList = JSON.parse(localStorage.getItem("STATE_KEY")) || [];
}

function saveRecord(records){
  localStorage.setItem(STATE_KEY, JSON.stringify(records));
}

function initRecord(){
  recordsList = loadRecord();
}

export function BMI() {
  const heightInput = document.getElementById("inputHeight");
  const weightInput = document.getElementById("inputWeight");
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    Swal.fire("請輸入有效身高體重！");
    return;
  }
  const bmi = weight / (height / 100) ** 2;
  if (bmi >= 28.5) {
    Swal.fire({
      title: "您的BMI大於28！",
      text: "我們將會為您推薦瘦身計畫，按確定立即轉跳。",
      icon: "warning",
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "plan.html";
      }
    });
  } else {
    Swal.fire(`您的 BMI 是  ${bmi.toFixed(2)} `);
  }
  const date = new Date().toLocaleDateString();
  addRecord(date, height, weight, bmi.toFixed(2));
}

function addRecord(date, height, weight, bmi) {
  const row = document.createElement("tr");
  const recordTableBody = document.querySelector("#recordTable tbody");
  row.innerHTML = `
    <td>${date}</td>
    <td>${height}</td>
    <td>${weight}</td>
    <td>${bmi}</td>`;
  recordTableBody.appendChild(row);
  const deleteBtn = document.createElement("td");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = deleteBMI;
  row.appendChild(deleteBtn);
}

function deleteBMI() {
  const list = this.parentNode;
  const parent = list.parentNode;
  parent.removeChild(list);
}

// export function saveRecord(date, height, weight, bmi) {
//   const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
//   records.push({ date, height, weight, bmi });
//   localStorage.setItem("bmirecords", JSON.stringify(records));
// }

// export function loadRecords() {
//   const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
//   records.forEach((record) => {
//     addRecord(record.date, record.height, record.weight, record.bmi);
//   });
// }

// export function deleteRecord(
//   dateToDelete,
//   heightToDelete,
//   weightToDelete,
//   bmiToDelete
// ) {
//   const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
//   const updatedRecords = records.filter(
//     (record) =>
//       record.date !== dateToDelete ||
//       record.height !== heightToDelete ||
//       record.weight !== weightToDelete ||
//       record.bmi !== bmiToDelete
//   );
//   localStorage.setItem("bmirecords", JSON.stringify(updatedRecords));
// }
