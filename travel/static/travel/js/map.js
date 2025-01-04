function initMap() {
  const target = document.getElementById("map_show");
  const address = spotAddress;
  const geocoder = new google.maps.Geocoder();
  console.log(address);

  geocoder.geocode({ address: address }, function (results, status) {
    if (status === "OK" && results[0]) {
      // Map取得
      const map = new google.maps.Map(target, {
        zoom: 18,
        center: results[0].geometry.location,
        mapTypeId: "roadmap",
      });

      // Marker取得
      const marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
      });

      // 情報ウィンドウ設定
      const latlng = new google.maps.LatLng(
        results[0].geometry.location.lat(),
        results[0].geometry.location.lng()
      );
      const info =
        '<div class="info">' +
        "<p>" +
        address +
        "</p>" +
        '<p><a href="https://maps.google.co.jp/maps?q=' +
        latlng +
        '&iwloc=J" target="_blank" rel="noopener noreferrer">Googleマップで見る</a></p>' +
        "</div>";
      var infowindow = new google.maps.InfoWindow({
        content: info,
      });

      // 情報ウィンドウ表示
      infowindow.open(map, marker);

      // クリックイベント設定
      google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });
    } else {
      return;
    }
  });
}
