const colors = ["red", "blue", "black", "brown", "green"];

document.body.style.backgroundColor = colors[Math.floor(Math.random() * 5)];

const anchor_link = document.getElementsByTagName("a")[0];

const premier_text = document.getElementsByClassName("premier-text")[0];

const base_url = "http://localhost:1337";

const fetch_youtube_premier_url = () => {
  fetch(base_url + "/api/youtube-premier-urls")
    .then((res) => res.json())
    .then((res) => {
      const url = res.data[0].attributes.url;
      anchor_link.href = url;
      const day = new Date(res.data[0].attributes.premier_time);
      const yyyy = day.getFullYear();
      let mm = day.getMonth() + 1; // Months start at 0!
      let dd = day.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const remainingTime = (day.getTime() - new Date().getTime()) / 1000;

      let days = Math.floor(remainingTime / 86400);
      let hours = Math.floor((remainingTime % 86400) / 3600);
      let minutes = Math.floor(((remainingTime % 86400) % 3600) / 60);
      let seconds = Math.floor(((remainingTime % 86400) % 3600) % 60);
      let display = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
      hours = hours + days * 24;
      display = [
        hours < 10 ? "0" + hours : hours,
        minutes < 10 ? "0" + minutes : minutes,
        seconds < 10 ? "0" + seconds : seconds,
      ].join(":");

      const formattedToday = +mm + "/" + dd + "/" + yyyy;
      document.getElementById("premier-day").innerText = formattedToday;
      premier_text.innerHTML =
        remainingTime > 0 ? "Premiering in: " + display : "";
    });
};
fetch_youtube_premier_url();
setInterval(() => {
  fetch_youtube_premier_url();
}, 1000);

const fetch_background_image = () => {
  const image = document.getElementsByTagName("img")[0];
  fetch(base_url + "/api/new-tab-hero-images?populate=%2A")
    .then((res) => res.json())
    .then((res) => {
      const active_of_images = res.data.filter(
        (data) => data.attributes.active
      );

      const url =
        active_of_images[Math.floor(Math.random() * active_of_images.length)]
          .attributes.image.data.attributes.formats.thumbnail.url;
      if (image.style.visibility !== "visible") {
        image.src = base_url + url;
        image.style.visibility = "visible";
      }
    });
};
fetch_background_image();
setInterval(() => {
  fetch_background_image();
}, 1000);
