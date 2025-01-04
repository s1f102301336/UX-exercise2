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
    // const now_weather = document.getElementById("now_weather");
    // now_weather.textContent = weather;

    //今の時間を取得
    const now_time = new Date().getHours();

    const now_hours =
      6 <= now_time && now_time <= 11
        ? "Morning"
        : 12 <= now_time && now_time <= 16
        ? "Noon"
        : "Night";
    // const hours = document.getElementById("now_hours");
    // hours.textContent = now_hours;

    //HTMLに反映
    const id_weather =
      weather === "Clear" || weather === "Sunny"
        ? "sunny"
        : weather === "Clouds"
        ? "cloudy"
        : "rainy";
    const id_hours = now_hours.toLowerCase();

    $(document).ready(() => {
      const now_situation = () => {
        $(`#now_weather i[id!=${id_weather}]`).hide();
        $(`#now_hours i[id!=${id_hours}]`).hide();
      };

      now_situation();
    });

    // 全データの取得
    const dataResponse = await fetch(DATA_URL);
    const allData = await dataResponse.json();
    // console.log("All Data:", allData);

    //スライドショーの写真抽出
    createSlide(allData);

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

    const W_num = 4; //表示数

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

      const S_num = 4; //表示数

      // HTMLに季節フィルタリングしたデータを表示
      updateHTML(filteredData_season.slice(0, S_num), `${season}-data`);
    });

    //最後にスライドショー
    slideshow();
  } catch (error) {
    console.error("Error:", error);
  }
});

//スライドショーimgを作成
const createSlide = (all_data) => {
  const slideshow = document.getElementById("slideshow");
  slideshow.innerHTML = "";
  all_data.forEach((data) => {
    const img = document.createElement("img");
    img.setAttribute("src", `/media/${data.image}`);
    img.setAttribute("alt", `Slide ${data.id}`);
    img.setAttribute("class", "slide");

    slideshow.appendChild(img);
  });
};

//スライドショーする関数
const slideshow = () => {
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  // クラスの更新関数
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove("previous2", "previous", "active", "next");
      if (index === (currentIndex - 2 + slides.length) % slides.length) {
        slide.classList.add("previous2");
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add("previous");
      } else if (index === currentIndex) {
        slide.classList.add("active");
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.add("next");
      }
    });
  }

  // スライドを切り替える関数
  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  // 初期化
  updateSlides();

  // 一定間隔でスライドを切り替え
  setInterval(showNextSlide, 6000); // 3秒ごとに次のスライドを表示
};

// HTMLの更新関数
function updateHTML(data, containerId) {
  const container = document.getElementById(containerId); //親タグのid
  console.log(container);

  container.innerHTML = ""; // 一度クリア
  data.forEach((item) => {
    const tag_weather = item.weather;
    const tag_hours = item.time;

    const div_pp = document.createElement("div");
    div_pp.setAttribute("class", "col-6 p-3 div_pp");
    const div_p = document.createElement("a");
    const div_c = document.createElement("div");
    const div_c_text = document.createElement("div");
    div_p.setAttribute("class", "content card shadow");
    div_p.setAttribute("href", item.detail_url);
    div_c.setAttribute("class", "content_text card-body pb-2");
    if (item.image) {
      div_p.innerHTML += `<img src="/media/${item.image}" alt="${item.title}" class="card-img-top" style="height:70%">`;
    }

    if (item.title) {
      div_c.innerHTML += `<h3 class="title">${item.title}</h3>`;
    }

    div_c_text.setAttribute("class", "d-none d-lg-block");
    switch (tag_weather) {
      case "Sunny":
        div_c_text.innerHTML +=
          '<strong>おすすめの天気:</strong><i class="bi bi-brightness-high-fill" style="color: orange"></i><i class="bi bi-cloud-fill" id="cloudy" style="color: grey"></i>';
        break;
      case "Cloudy":
        div_c_text.innerHTML +=
          '<strong>おすすめの天気:</strong><i class="bi bi-cloud-fill" id="cloudy" style="color: grey"></i>';
        break;
      case "Rainy":
        div_c_text.innerHTML +=
          '<strong>おすすめの天気:</strong><i class="bi bi-cloud-rain-fill" style="color: skyblue"></i>';
        break;
      case "All_Weather":
        div_c_text.innerHTML +=
          '<strong>おすすめの天気:</strong><i class="bi bi-brightness-high-fill" style="color: orange"></i><i class="bi bi-cloud-fill" id="cloudy" style="color: grey"></i><i class="bi bi-cloud-rain-fill" style="color: skyblue"></i>';
        break;
    }

    switch (tag_hours) {
      case "Morning":
        div_c_text.innerHTML +=
          '<br><strong>おすすめの時間帯:</strong><i class="bi bi-brightness-alt-high-fill" style="color: orange"></i>';
        break;
      case "Noon":
        div_c_text.innerHTML +=
          '<br><strong>おすすめの時間帯:</strong><i class="bi bi-brightness-high-fill" style="color: orange"></i>';
        break;
      case "Night":
        div_c_text.innerHTML +=
          '<br><strong>おすすめの時間帯:</strong><i class="bi bi-moon-stars-fill" style="color: yellow"></i>';
        break;
      case "All_the_Day":
        div_c_text.innerHTML +=
          '<br><strong>おすすめの時間帯:</strong><i class="bi bi-brightness-alt-high-fill" style="color: red"><i class="bi bi-brightness-high-fill" style="color: orange"></i><i class="bi bi-moon-stars-fill" style="color: yellow"></i>';
    }

    container.appendChild(div_pp);
    div_pp.appendChild(div_p);
    div_p.appendChild(div_c);
    div_c.appendChild(div_c_text);
  });
}
