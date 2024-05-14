var userData = [];

function saveUserData() {
  localStorage.setItem("userData", JSON.stringify(userData));
}

function loadUserData() {
  var data = localStorage.getItem("userData");
  if (data !== null) {
    userData = JSON.parse(data);
  }
}

function updateTable() {
  $("#recordTable").empty();

  for (var i = 0; i < userData.length; i++) {
    var record = userData[i];
    var tableRow =
      "<tr>" +
      "<td>" +
      record.height +
      "</td>" +
      "<td>" +
      record.weight +
      "</td>" +
      "<td>" +
      record.bmi +
      "</td>" +
      "<td><button class='btn btn-sm btn-danger deleteButton' data-index='" +
      i +
      "'>刪除</button></td>" +
      "</tr>";

    $("#recordTable").append(tableRow);
  }

  $(".deleteButton").click(function () {
    var index = $(this).data("index");
    userData.splice(index, 1);
    saveUserData();
    updateTable();
    updateChart();
  });
}

function updateChart() {
  var labels = [];
  var data = [];

  for (var i = 0; i < userData.length; i++) {
    labels.push(i + 1);
    data.push(userData[i].bmi);
  }
  if (chart !== undefined) chart.destroy();
  var ctx = document.getElementById("bmiChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "BMI",
          data: data,
          backgroundColor: "#007bff",
          borderColor: "#007bff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 40,
        },
      },
    },
  });
}

var chart;
$(document).ready(function () {
  loadUserData();
  updateTable();
  updateChart();

  $("#addRecordForm").submit(function (event) {
    event.preventDefault();

    var height = $("#height").val();
    var weight = $("#weight").val();

    var bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);

    var record = {
      height: height,
      weight: weight,
      bmi: bmi,
    };

    userData.push(record);
    saveUserData();
    updateTable();
    updateChart();

    $("#height").val("");
    $("#weight").val("");
  });
});
