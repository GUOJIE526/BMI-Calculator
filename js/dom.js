export function addRecord(date, height, weight, bmi) {
  const row = document.createElement("tr");
  const recordTableBody = document.querySelector("#recordTable tbody");
  row.innerHTML = `
    <td>${date}</td>
    <td>${height}</td>
    <td>${weight}</td>
    <td>${bmi}</td>
    <td><button class="delete-btn"></button></td>`;
  recordTableBody.appendChild(row);

  //add deletebtn
  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteRecord(date, height, weight, bmi);
    row.remove();
  });
}

export function saveRecord(date, height, weight, bmi) {
  const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
  records.push({ date, height, weight, bmi });
  localStorage.setItem("bmirecords", JSON.stringify(records));
}

export function loadRecords() {
  const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
  records.forEach((record) => {
    addRecord(record.date, record.height, record.weight, record.bmi);
  });
}

export function deleteRecord(
  dateToDelete,
  heightToDelete,
  weightToDelete,
  bmiToDelete
) {
  const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
  const updatedRecords = records.filter(
    (record) =>
      record.date !== dateToDelete ||
      record.height !== heightToDelete ||
      record.weight !== weightToDelete ||
      record.bmi !== bmiToDelete
  );
  localStorage.setItem("bmirecords", JSON.stringify(updatedRecords));
}
