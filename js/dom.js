export function addRecord(date, height, weight, bmi) {
  const recordTableBody = document.querySelector("#recordTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${date}</td>
    <td>${height}</td>
    <td>${weight}</td>
    <td>${bmi}</td>`;
  recordTableBody.appendChild(row);
}

export function saveRecord(date, height, weight, bmi) {
  const records = JSON.parse(localStorage.getItem("bmiRecords")) || [];
  records.push({ date, height, weight, bmi });
  localStorage.setItem("bmiRecords", JSON.stringify(records));
}
