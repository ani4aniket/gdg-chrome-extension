//Pure JS code with jQuery implementation

document.addEventListener(
  "DOMContentLoaded",
  function() {
    var serachString = window.location.search;
    var gdgName = serachString.split("=")[1];

    const url = "https://api-gdg.herokuapp.com/" + gdgName + "/upcoming_events";
    var mem_event;
    var html = "";

    //API request
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(res => {
        res.forEach(element => {
          html += getTemplate(element);
        });
        var location = res[0].group.localized_location;
        $("#location").append(location);

        //Append popup.html do dynamically load data from the api
        $("#user-reviews").append(html);

        //code for the map
        const mymap = L.map("gdgmap").setView(
          [res[0].group.lat, res[0].group.lon],
          10
        );
        const attribution =
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
        const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);
        res.forEach(element => {
          marker = new L.marker([element.venue.lat, element.venue.lon])
            .bindPopup(element.venue.name)
            .addTo(mymap);
        });
      });

    //template for event card
    function getTemplate(member) {
      var template =
        '<figure class="review">\
      <blockquote class="review__text">' +
        member.description.substring(0, 150) +
        '...</blockquote>\
      <figcaption class="review__user">\
        <img  src="img/favicon.png" alt="User 1" class="review__photo">\
        <div class="review__user-box">\
          <p class="review__user-name">' +
        member.name +
        '</p>\
          <p class="review__user-date">' +
        member.local_date +
        '</p>\
        </div>\
        <div class="review__rating">' +
        member.yes_rsvp_count +
        ' Going</div>\
      </figcaption>\
    </figure>\
    <div class="cta" id="rsvp">\
          <a href="' +
        member.link +
        ' "target="_blank">\
              <button class="btn">\
                <span class="btn__visible">RSVP</span>\
                <span class="btn__invisible">Hurry!</span>\
              </button>\
              </a>\
            </div>';
      return template;
    }
  },
  false
);
