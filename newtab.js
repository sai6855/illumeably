 const colors = ["red", "blue", "voilet", "yellow", "green"];

    document.body.style.backgroundColor = colors[Math.floor(Math.random() * 5)];

    const anchor_link = document.getElementsByTagName("a")[0];
    const image = document.getElementsByTagName("img")[0];

    const base_url = "http://localhost:1337";

    const fetch_youtube_premier_url = () => {
      fetch(base_url + "/api/youtube-premier-urls")
        .then((res) => res.json())
        .then((res) => {
          const url = res.data[0].attributes.url;
          anchor_link.href = url;
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