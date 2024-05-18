document.addEventListener("DOMContentLoaded", function () {
  const bmiForm = document.getElementById("bmi-form");
  const heightInput = document.getElementById("inputHeight");
  const weightInput = document.getElementById("inputWeight");
  const btn = document.getElementById("btn");
  const recordTableBody = document.querySelector("#recordTable tbody");

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
      alert("你的 BMI 超過 30，我們會為您搜索附近的健身房，請趕快去健身。");
      searchNearbyGym();
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

  function searchNearbyGym() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const map = L.map("map").setView([latitude, longitude], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const markers = L.markerClusterGroup();

        const service = new google.maps.places.PlacesService(
          document.createElement("div")
        );
        const request = {
          location: new google.maps.LatLng(latitude, longitude),
          radius: "5000",
          type: ["gym"],
          keyword: "gym",
          minPriceLevel: 0,
          maxPriceLevel: 4,
        };
      });
    }
  }
});
