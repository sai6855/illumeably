const colors = ["red", "blue", "voilet", "yellow", "green"];

document.body.style.backgroundColor = colors[Math.floor(Math.random() * 5)];

const anchor_link = document.getElementsByTagName("a")[0];
const image = document.getElementsByTagName("img")[0];
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
      let hours = day.getHours();
      let minutues = day.getMinutes();
      let sec = day.getSeconds();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      if (hours < 10) hours = "0" + hours;
      if (minutues < 10) minutues = "0" + minutues;
      if (sec < 10) sec = "0" + sec;

      const formattedToday = dd + "/" + mm + "/" + yyyy;
      premier_text.innerHTML =
        day.getTime() > new Date().getTime()
          ? "Premiering on: " +
            formattedToday +
            " " +
            [hours, minutues, sec].join(":")
          : "";
    });
};
fetch_youtube_premier_url();
setInterval(() => {
  fetch_youtube_premier_url();
}, 1000);

const fetch_background_image = () => {
  fetch(base_url + "/api/new-tab-hero-images?populate=%2A")
    .then((res) => res.json())
    .then((res) => {
      const url =
        res.data[0].attributes.image.data.attributes.formats.thumbnail.url;
      image.src = base_url + url;
      image.style.visibility = "visible";
    });
};
fetch_background_image();
setInterval(() => {
  fetch_background_image();
}, 1000);
