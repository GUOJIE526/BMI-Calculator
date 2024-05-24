export function addRecord(record) {
  const row = document.createElement("tr");
  const recordTableBody = document.querySelector("#recordTable tbody");
  row.innerHTML = `
  <td>${record.date}</td>
  <td>${record.height}</td>
  <td>${record.weight}</td>
  <td>${record.bmi}</td>
  <td><button class="delete-btn"></button></td>`;
  recordTableBody.appendChild(row);

  //add deletebtn
  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteRecord(record);
    row.remove();
  });
}

export function saveRecord(record) {
  const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
  records.push(record);
  localStorage.setItem("bmirecords", JSON.stringify(records));
}

export function loadRecords() {
  const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
  records.forEach((record) => {
    addRecord(record);
  });
}

export function deleteRecord(recordToDelete) {
  const records = JSON.parse(localStorage.getItem("bmirecords")) || [];
  const updateRecords = records.filter(
    (record) =>
      !(
        record.date === recordToDelete.date &&
        record.height === recordToDelete.height &&
        record.weight === recordToDelete.weight &&
        record.bmi === recordToDelete.bmi
      )
  );
  localStorage.setItem("bmirecords", JSON.stringify(updateRecords));
}
