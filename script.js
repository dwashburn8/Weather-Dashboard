$(document).ready(function () {
    var city = $("#input").val();
    var now = moment().format("MMMM Do YYYY");
    var currentTime = moment().format("HH:mm:ss");
    var apiKey = "044c71fb82a90d43fcc214e917990441"
    localStorage.getItem("cityList")

    var cityList = [];
    var storageList= [];


   
    if (localStorage.getItem("cityList") !== null) {
       var storage = JSON.parse(localStorage.getItem("cityList"));

    
       for(let k = 0; k< storage.length; k++){
           cityList.push(storage[k]);

       }
         console.log(cityList);
         
         for(let j =0; j < cityList.length; j++){
            let listStorage = $("<button>").addClass("list-group-item-action text-white bg-secondary mb-3").text(cityList[j]).val(cityList[j]);
            $("#cities").append(listStorage);
         }
         $(".list-group-item-action").on("click", function (event) {
            event.preventDefault()
            city = $(event.target).val();
            fiveDayForecast()
            weather()
        });
    }

    
    $("#input").keypress(function (event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            $("#button-addon2").click();
        }
    });


    $("#button-addon2").on("click", function (event) {
        event.preventDefault()
        city = $("#input").val()
        $("#input").val("");

   
        if(cityList.indexOf(city) === -1){
            cityList.push(city);

            function makeList() {
                let listElement = $("<button>").addClass("list-group-item-action text-white bg-secondary mb-3").text(city).val(city);
                $("#cities").append(listElement);
    
            };

            makeList();
        }


        fiveDayForecast()
        weather()

        $(".list-group-item-action").on("click", function (event) {
            event.preventDefault()
            city = $(event.target).val();
            fiveDayForecast()
            weather()
        })

        console.log(cityList);
        localStorage.setItem("cityList", JSON.stringify(cityList))

    });
    function weather() {
        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
             console.log(response);
            var newP1 = $("#p1");
            var newP2 = $("#p2");
            var newP3 = $("#p3");


            var iconCode = response.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $("#icon").attr("src", iconUrl)
            var uvIndex = response
            newP1.text("Temperature: " + response.main.temp + "°F")
            newP2.text("Humidity: " + response.main.humidity + "%")
            newP3.text("Wind Speed: " + response.wind.speed + "MPH")
            $("#city").text(city.charAt(0).toUpperCase() + city.substr(1).toLowerCase() + ": " + now);


            newP1.attr("class", " pl-3 pt-2")

            newP2.attr("class", " pl-3")

            newP3.attr("class", " pl-3")



        })
    };

    function fiveDayForecast() {

        var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey

        $.ajax({
            url: fiveDay,
            method: "GET"
        }).then(function (data) {
            // console.log(data);

            var midNight = [];
            var iconArray = [];
            var tempArray = [];
            var humidityArray = [];
            for (let i = 0; i < data.list.length; i++) {
                var time = data.list[i].dt_txt.substring(11)
                var date = data.list[i].dt_txt.substring(0, 10)
                var iconCode2 = data.list[i].weather[0].icon;
                var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
                // $("#icon").attr("src", iconUrl)
                var fiveDayTemp = data.list[i].main.temp;
                var fiveDayHumidity = data.list[i].main.humidity;


                if (time === "00:00:00") {
                    midNight.push(date);
                    iconArray.push(iconUrl2)
                    tempArray.push(fiveDayTemp)
                    humidityArray.push(fiveDayHumidity)
                    //Adding the date to each div
                    $("#0").text(midNight[0])
                    $("#1").text(midNight[1])
                    $("#2").text(midNight[2])
                    $("#3").text(midNight[3])
                    $("#4").text(midNight[4])
                    // Adding Icons for 5 day forcast 
                    $("#forecast0").attr("src", iconArray[0])
                    $("#forecast1").attr("src", iconArray[1])
                    $("#forecast2").attr("src", iconArray[2])
                    $("#forecast3").attr("src", iconArray[3])
                    $("#forecast4").attr("src", iconArray[4])
                    //Adding temperature for 5 day forcast 
                    $("#temp0").text("Temperature: " + tempArray[0] + "°F")
                    $("#temp1").text("Temperature: " + tempArray[1] + "°F")
                    $("#temp2").text("Temperature: " + tempArray[2] + "°F")
                    $("#temp3").text("Temperature: " + tempArray[3] + "°F")
                    $("#temp4").text("Temperature: " + tempArray[4] + "°F")
                    //Adding Humidity
                    $("#hum0").text("Humidity: " + humidityArray[0] + "%")
                    $("#hum1").text("Humidity: " + humidityArray[1] + "%")
                    $("#hum2").text("Humidity: " + humidityArray[2] + "%")
                    $("#hum3").text("Humidity: " + humidityArray[3] + "%")
                    $("#hum4").text("Humidity: " + humidityArray[4] + "%")


                };

            };

        });
    };
});