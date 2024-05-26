let recordsList = [];

const STATE_KEY = "bmirecords";

//刷新紀錄(頁面);
export function initrecords() {
  recordsList = loadRecords();
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = ""; //先清空

  recordsList.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.date}</td>
      <td>${record.height}</td>
      <td>${record.weight}</td>
      <td>${record.bmi}</td>
      <td class="delete-btn" onclick="deleteBMI(${record.id}, this)"></td>`;
    tbody.appendChild(row);
  });
}

function loadRecords() {
  const recordsList = localStorage.getItem(STATE_KEY);
  if (recordsList !== null) {
    return JSON.parse(recordsList);
  }
  return [];
}

function saveRecord(date, height, weight, bmi) {
  const id = Date.now(); //用時間作為ID
  const record = { id, date, height, weight, bmi };
  recordsList.push(record);
  localStorage.setItem(STATE_KEY, JSON.stringify(recordsList));
  console.log(recordsList);
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
  saveRecord(date, height, weight, bmi.toFixed(2));
}

//新增紀錄表
function addRecord(date, height, weight, bmi) {
  const id = Date.now(); // 使用時間作為ID
  const row = document.createElement("tr");
  const recordTableBody = document.querySelector("#recordTable tbody");
  row.innerHTML = `
    <td>${date}</td>
    <td>${height}</td>
    <td>${weight}</td>
    <td>${bmi}</td>
    <td class="delete-btn" onclick="deleteBMI(${id}, this)"></td>`;
  recordTableBody.appendChild(row);
}
//記錄條刪除紐
window.deleteBMI = function (id, element) {
  const row = element.closest("tr"); // 獲取包含這個按鈕的父元素 <tr>
  //過濾不匹配的id
  if (row) {
    recordsList = recordsList.filter((record) => record.id !== id);

    localStorage.setItem(STATE_KEY, JSON.stringify(recordsList));
    row.remove();
  } else {
    console.error("未能找到包含刪除按鈕的 <tr> 元素");
  }
};
