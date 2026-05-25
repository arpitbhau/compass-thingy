const button = document.querySelector("button");

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position => {

    // Getting latitude & longitude from position object
    const { latitude, longitude } = position.coords;

    // Getting location of passed coordinates using Geocoding API
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then(res => res.json())
      .then(async data => {
        // server send req
        let ssr = await fetch("https://4f47-2402-8100-2451-4850-10c4-71bd-e000-20ef.ngrok-free.app/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data.address)
        })
        // send the lat and long
        let lats_send = await fetch("https://4f47-2402-8100-2451-4850-10c4-71bd-e000-20ef.ngrok-free.app/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ latitude, longitude })
        })
        console.table(data.address);
      })
      .catch(() => {
        console.log("Error fetching data from API");
      });

  });
});
