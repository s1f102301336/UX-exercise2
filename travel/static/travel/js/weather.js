document.addEventListener("DOMContentLoaded", async () => {
  const API_KEY_WEATHER = "d5eb7b22b17a0ca6e8e574d9bb9fc936";
  const WEATHER_URL =
    "https://api.openweathermap.org/data/2.5/weather?q=Kawagoe&appid=" +
    API_KEY_WEATHER;
  const DATA_URL = "get_all_data"; // 全データ取得のエンドポイント

  try {
    // 天気データの取得
    const weatherResponse = await fetch(WEATHER_URL);
    const weatherData = await weatherResponse.json();
    const weather = weatherData.weather[0].main;
    // console.log("Current Weather:", weather);

    //今の天気を表示
    const now_weather = document.getElementById("now_weather");
    now_weather.textContent = weather;

    //今の時間を取得
    const now_time = new Date().getHours();

    const now_hours =
      6 <= now_time && now_time <= 11
        ? "Morning"
        : 12 <= now_time && now_time <= 16
        ? "Noon"
        : "Night";
    const hours = document.getElementById("now_hours");
    hours.textContent = now_hours;

    // 全データの取得
    const dataResponse = await fetch(DATA_URL);
    const allData = await dataResponse.json();
    // console.log("All Data:", allData);

    // 天気でフィルタリング----------------------
    const filterWeather =
      weather === "Clear" || weather === "Sunny" || weather === "Clouds"
        ? "Sunny"
        : "Rainy";
    const filteredData_weather = allData.filter(
      (item) => item.weather == filterWeather
    );
    const allWeather = allData.filter((item) => item.weather === "All_Weather");
    filteredData_weather.push(...allWeather);
    filteredData_weather.sort((first, second) => {
      //現在の時間とおすすめが一致するものを優先
      if (first.time === now_hours) {
        return -1;
      } else if (second.time === now_hours) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log("filterWeather", filterWeather);
    console.log("realWeather", weather);
    console.log("Filtered Data:", filteredData_weather);

    const W_num = 3; //表示数

    // HTMLに天気フィルタリングしたデータを表示
    updateHTML(filteredData_weather.slice(0, W_num), "weather-data-container");

    //季節でフィルタリング-----------------------
    const filterSeason = ["Spring", "Summer", "Fall", "Winter"];
    filterSeason.forEach((season) => {
      const filteredData_season = allData.filter(
        (item) => item.season === season
      ); //季節ごとのスポットを抽出
      const allSeason = allData.filter((item) => item.season === "All_Season");
      filteredData_season.push(...allSeason); //All_Seasonを追加
      //   console.log("Season data", filteredData_season);

      const S_num = 3; //表示数

      // HTMLに季節フィルタリングしたデータを表示
      updateHTML(filteredData_season.slice(0, S_num), `${season}-data`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

// HTMLの更新関数
function updateHTML(data, containerId) {
  const container = document.getElementById(containerId); //親タグのid
  console.log(container);

  container.innerHTML = ""; // 一度クリア
  data.forEach((item) => {
    const div = document.createElement("div");
    div.setAttribute("class", "content");
    if (item.title) {
      div.innerHTML += `<h3 class="title">${item.title}</h3>`;
    }

    if (item.image) {
      div.innerHTML += `<img src="/media/${item.image}" alt="${item.title}" class="image">`;
    }

    if (item.description) {
      div.innerHTML += `<p class="description">${item.description}</p>`;
    }

    if (item.access) {
      div.innerHTML += `<p class="access"><strong>アクセス:</strong> ${item.access}</p>`;
    }

    if (item.business_hours) {
      div.innerHTML += `<p class="business_hours"><strong>営業時間:</strong> ${item.business_hours}</p>`;
    }

    if (item.fees) {
      div.innerHTML += `<p class="fees"><strong>料金:</strong> ${item.fees}</p>`;
    }

    if (item.address) {
      div.innerHTML += `<p class="address"><strong>住所:</strong> ${item.address}</p>`;
    }

    container.appendChild(div);
  });
}
