const api = {
  key: "2edff49bfce415330fb97e3bfbf12ff6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);

  let city = document.querySelector(".wrap-weather .kota");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".wrap-weather .tanggal");
  date.innerHTML = dateBuilder(now);

  let jam = document.querySelector(".wrap-weather .jam");
  jam.innerHTML = jambu(now);

  let temp = document.querySelector(".wrap-weather .suhu");
  temp.innerHTML = `${Math.round(weather.main.temp) - 273}
  <span>°C</span>`;

  //   let gambar = document.querySelector(".wrap-weather .gambar");
  //   gambar.innerHTML = `${weather.weather[0].icon}`;

  let iconcode = weather.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $(".gambar").attr("src", iconurl);

  let weather_el = document.querySelector(".wrap-weather .awan");
  weather_el.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector(".wrap-weather .suhu-min");
  hilow.innerHTML = `Hi ${Math.round(
    weather.main.temp_min - 273
  )} / Lo ${Math.round(weather.main.temp_max - 273)}°C`;
}

function dateBuilder(d) {
  let months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  let days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

function jambu(j) {
  let hour = j.getHours();
  let min = j.getMinutes();

  return `${hour} : ${min}  `;
}
