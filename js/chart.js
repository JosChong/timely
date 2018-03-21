function createChart(name) {
    var context = document.getElementById(name + "-donut").getContext("2d");
    var donutChart = new Chart(context, config);
    generateChart(name);
};

var config = {
    type: "doughnut",
    data: {
        datasets: [{
            data: [
                0,
                6
            ],
            backgroundColor: [
                "#FD7F56",
                "#EEEEEE"
            ],
            borderColor: [
                "#111111",
                "#111111"
            ],
            borderWidth: [
                "4",
                "4"
            ]
        }]
    },
    options: {
        tooltips: {
            enabled: false
        },
        hover: {
            mode: null
        }
    }
};

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomBar(date, lastClose) {
  var open = randomNumber(lastClose * 0.95, lastClose * 1.05);
  var close = randomNumber(open * 0.95, open * 1.05);
  return {
    t: date.valueOf(),
    y: close
  };
}

function generateChart(name) {
  var dateFormat = "MM DD YYYY";
  var date = moment("January 1 2018", dateFormat);
  var data = [randomBar(date, 30)];
  var labels = [date];

  while (data.length < 20) {
    date = date.clone().add(1, "d");
    if (date.isoWeekday() <= 5) {
      data.push(randomBar(date, data[data.length - 1].y));
      labels.push(date);
    }
  }

  var ctx = document.getElementById(name + "-chart").getContext("2d");
  ctx.canvas.width = 1000;
  ctx.canvas.height = 300;
  var cfg = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Minutes Spent",
        data: data,
        type: "line",
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: "time",
          distribution: "series",
          ticks: {
            source: "labels"
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Minutes Spent"
          }
        }]
      }
    }
  };
  var chart = new Chart(ctx, cfg);
  document.getElementById(name + "-update").addEventListener("click", function() {
    var type = document.getElementById(name + "-type").value;
    chart.config.data.datasets[0].type = type;
    chart.update();
  });
}
