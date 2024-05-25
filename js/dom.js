let recordsList = [];

const STATE_KEY = "bmirecods";

//讀取localStorage
export function loadRecord() {
  const recordsList = localStorage.getItem(STATE_KEY);
  if (recordsList !== null) {
    return JSON.parse(recordsList);
  }
  return [];
}

//儲存localStorage
function saveRecord(record) {
  localStorage.setItem(STATE_KEY, JSON.stringify(record));
}

//更新紀錄(頁面)
function initrecords() {
  recordsList = loadRecord();
  const tr = document.createElement("tr");
  let records = [];
  const td = document.createElement("td");
  for (let i = 0; i < recordsList.length; i++) {
    records += i;
  }
  td.appendChild(records);

  const deleteButton = document.createElement("td");
  deleteButton.classList.add("delete-btn");
  deleteButton.onclick = deleteBMI;
  td.appendChild(deleteButton);
  tr.appendChild(td);
}

//計算BMI
export function BMI() {
  const heightInput = document.getElementById("inputHeight");
  const weightInput = document.getElementById("inputWeight");
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);
  const date = new Date().toLocaleDateString();

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
  addRecord(date, height, weight, bmi.toFixed(2));
  recordsList.push(date, height, weight, bmi.toFixed(2));
  saveRecord(recordsList);
}

//新增紀錄表
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
//記錄條刪除紐
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
