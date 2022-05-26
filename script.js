if ("geolocation" in navigator) {
  var local;
  const btnSave = document.querySelector(".btn-save");
  const btnAtt = document.querySelector(".btn-att");
  const btnRemove = document.querySelector(".btn-remove");
  const contentDiv = document.querySelector(".content-div");
  const contentSaveDiv = document.querySelector(".content-save-list");
  let contentSaveItem = JSON.parse(localStorage.getItem("weather"));
  if (!contentSaveItem) {
    contentSaveItem = [];
    contentSaveDiv.innerHTML = `<p class="save-list-empty">Nenhuma informação salva</p>`;
  }

  contentDiv.innerHTML = `<div class="loader"></div>`;

  function getCoords() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        contentDiv.style.backgroundColor = "#e7e7e7";
        contentDiv.innerHTML =
          "<p class='position-error'>Permita o acesso a sua localização e recarregue a pagina</p>";
      }
    );
  }
  getCoords();
  setInterval(getCoords, 60000);
  btnAtt.addEventListener("click", getCoords);

  function convertTemp(kelvin) {
    const celsius = Math.round((273 - kelvin) * -1);
    return celsius;
  }

  async function getWeather(latitude, longitude) {
    const api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&appid=f514382f1aaaffe10f74bdcca8f2ebb9`
    );
    const apiJson = await api.json();
    const date = new Date();

    const dateObject = {
      day: date.toLocaleString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("pt-BR", {
        timeStyle: "short",
        hour12: false,
        numberingSystem: "latn",
      }),
    };

    local = {
      temp: convertTemp(apiJson.main.temp),
      icon: apiJson.weather[0].icon,
      weatherDescription: apiJson.weather[0].description,
      name: apiJson.name,
      date: dateObject,
    };

    contentDiv.innerHTML = `
    <div class="content-header">
      <h2>${local.name}</h2>
      <div class="content-weather">
        <img src="https://openweathermap.org/img/wn/${local.icon}@2x.png" alt="icon condições climáticas" width="150" height="150"/>
        <div>
          <p class="weather-description">${local.weatherDescription}</p>
          <p>${local.temp} °C</p>
        </div>
      </div>
      <div class="content-date">
        <p>${local.date.day}</p>
        <p>${local.date.time}</p>
      </div> 
    </div>`;
  }

  function uptadeSaveListHTML() {
    if (contentSaveItem.length > 0) {
      localStorage.setItem("weather", JSON.stringify(contentSaveItem));
      let result = contentSaveItem.map((item) => {
        return `
        <div class="content-header">
          <h2>${item.name}</h2>
          <div class="content-weather">
            <img src="https://openweathermap.org/img/wn/${item.icon}@2x.png" alt="icon condições climáticas" width="150" height="150"/>
            <div>
              <p class="weather-description">${item.weatherDescription}</p>
              <p>${item.temp} °C</p>
            </div>
          </div>
          <div class="content-date">
            <p>${item.date.day}</p>
            <p>${item.date.time}</p>
          </div> 
        </div>`;
      });
      contentSaveDiv.innerHTML = result.join("");
    } else {
      contentSaveDiv.innerHTML = `<p class="save-list-empty">Nenhuma informação salva</p>`;
    }
  }

  if (contentSaveItem) {
    uptadeSaveListHTML();
  }

  btnSave.addEventListener("click", () => {
    contentSaveItem.push(local);
    uptadeSaveListHTML();
  });

  btnRemove.addEventListener("click", () => {
    localStorage.removeItem("weather");
    contentSaveItem = [];
    contentSaveDiv.innerHTML = `<p class="save-list-empty">Nenhuma informação salva</p>`;
  });
} else {
  contentDiv.style.backgroundColor = "#e7e7e7";
  contentDiv.innerHTML =
    "<p class='position-error'>Não é possível acessar a localização, tente em outro navegador ou ligue seu GPS!</p>";
}
