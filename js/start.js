document.addEventListener(
  "DOMContentLoaded",
  function() {
    $("#sel2").hide();
    var Button = document.getElementById("seek");

    //Get the selected country
    $("#sel1").change(function() {
      var sel1 = document.getElementById("sel1");
      var country = sel1.options[sel1.selectedIndex].text;

      //Create an endpoint to get the name of the gdgs in that country
      url = "https://api-gdg.herokuapp.com/custom/country/" + country;

      $("#sel2").empty();
      var options = "";

      //the first option should be select
      options = "<option>Select GDG</option>";
      fetch(url)
        .then(data => {
          return data.json();
        })
        .then(res => {
          res.forEach(element => {
            options += getTemplate(element);
          });
          //put all the names in the list

          $("#sel2").append(options);
          console.log(options);
          $("#sel2").show();
          //get the name of the selected gdg
          $("#sel2").change(function() {
            var sel2 = document.getElementById("sel2");
            var gdgName = sel2.options[sel2.selectedIndex].text;
            // Button.addEventListener("click", function() {
            //   //redirect to event-rsvp page
            //   window.location.replace("/start.html?gdg=" + gdgName);
            // });
            console.log(gdgName);
            const url = "https://api-gdg.herokuapp.com/" + gdgName + "/events";
            var mem_event;
            var events = [];

            //API request
            fetch(url)
              .then(data => {
                return data.json();
              })
              .then(res => {
                res.forEach(element => {
                  // console.log(element);
                  var ev = getTemplateNew(element);

                  $("#fetch-event").append(ev);
                });
              });
          });
        });
    });
    function getTemplate(member) {
      var tmp = "<option>" + member.urlname + "</option>";
      return tmp;
    }

    function getTemplateNew(member) {
      console.log(member);
      var template = `<div class="card" style="height: 200px">
      <img
        src="https://cloud.google.com/_static/images/cloud/icons/favicons/onecloud/super_cloud.png"
        alt="Avatar"
        style="max-height: 50px;"
      />
      <div class="container">
        <h4><b>${member.name}</b></h4>
        <div class="rsvp-btn">
          <p>${member.local_date}</p>
          <button href=${
            member.link
          } class="button" style="vertical-align:middle">
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>`;
      // console.log(template);
      return template;
    }
  },
  false
);
