export function addRecord(date, height, weight, bmi) {
  const row = document.createElement("tr");
  const recordTableBody = document.querySelector("#recordTable tbody");
  row.innerHTML = `
      <td>${date}</td>
      <td>${height}</td>
      <td>${weight}</td>
      <td>${bmi}</td>`;
  recordTableBody.appendChild(row);
}
