$(document).ready(() => {
  const season_hide = () => {
    $('#season_contents div[id != "Spring-data"]').hide();

    $("ul li a").click((event) => {
      event.preventDefault();

      const target = $(event.currentTarget);

      $("#season_contents div").hide();

      $(target.attr("href")).show();
      $(`${target.attr("href")} div`).show();

      $(".current").removeClass("current");
      target.addClass("current");
    });
  };

  season_hide();
});
