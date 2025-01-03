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
    console.log("Current Weather:", weather);

    //今の天気を表示
    const now_weather = document.getElementById("now_weather");
    now_weather.textContent = weather;

    // 全データの取得
    const dataResponse = await fetch(DATA_URL);
    const allData = await dataResponse.json();
    console.log("All Data:", allData);

    // 天気でフィルタリング----------------------
    const filterWeather =
      weather === "Clear" || weather === "Sunny" || weather === "Clouds"
        ? "Sunny"
        : "Rainy";
    const filteredData_weather = allData.filter((item) => {
      return item.weather == filterWeather || item.weather == "All_Weather";
      //   console.log("item", item);
    });
    console.log("filterWeather", filterWeather);
    console.log("realWeather", weather);

    console.log("Filtered Data:", filteredData_weather);

    // HTMLに天気フィルタリングしたデータを表示
    updateHTML(filteredData_weather, "weather-data-container");

    //季節でフィルタリング-----------------------
    const filterSeason = ["Spring", "Summer", "Fall", "Winter"];
    filterSeason.forEach((season) => {
      const filteredData_season = allData.filter(
        (item) => item.season === season || item.season === "All_Season"
      );
      console.log("Season data", filteredData_season);

      // HTMLに季節フィルタリングしたデータを表示
      updateHTML(filteredData_season, `${season}-data`);
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
    div.innerHTML = `
        <h3 class="title">${item.title}</h3>
        <img src="/media/${item.image}" alt="${item.title}" class="image">
        <p class="description">${item.description}</p>
        <p class="access"><strong>アクセス:</strong> ${item.access}</p>
        <p class="business_hours"><strong>営業時間:</strong> ${item.business_hours}</p>
        <p class="fees"><strong>料金:</strong> ${item.fees}</p>
        <p class="address"><strong>住所:</strong> ${item.address}</p>
      `;
    container.appendChild(div);
  });
}
