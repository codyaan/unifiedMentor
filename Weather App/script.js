document.title = "Weather - Today"


let temperature = document.querySelector(".temp");
let loc;

async function getTime(zone) {
    const url =
        `https://time-api4.p.rapidapi.com/api/Time/current/zone?timeZone=${zone}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "f73717f94dmsh7b95c41833740d5p1e2ecajsn49da97760de1",
            "X-RapidAPI-Host": "time-api4.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        day.innerHTML = result.dayOfWeek
        crTime.innerHTML = result.time
    } catch (error) {
        console.error(error);
    }

}
async function getWeather(weather) {
    let rawData = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weather}?unitGroup=metric&key=LR8PRXD6LNKSNLY5K8TXU7ESV&contentType=json`
    );
    let data = await rawData.json();
    await getTime(data.timezone)
    console.log(data)
    crTemp.innerHTML = data.currentConditions.temp;
    windSpeed.innerHTML = `${data.currentConditions.windspeed}km/hr`;
    direction.innerHTML = degToCompass(data.currentConditions.winddir);
    sunrise.innerHTML = data.currentConditions.sunrise.slice(0, 5);
    sunset.innerHTML = data.currentConditions.sunset.slice(0, 5);
    humidity.innerHTML = `${data.currentConditions.humidity}%`;
    visibility.innerHTML = data.currentConditions.humidity;
    feelsLike.innerHTML = data.currentConditions.feelslike;
    dew.innerHTML = data.currentConditions.dew;
    crCondition.innerHTML = data.currentConditions.conditions;
    crLocation.innerHTML = data.resolvedAddress.split(",")[0];
    if (data.currentConditions.humidity < 20) {
        humid.innerHTML = "Dryness";
    } else if (data.currentConditions.humidity < 60) {
        humid.innerHTML = "Normal";
    } else {
        humid.innerHTML = "Too High";
    }
    console.log(data.currentConditions.conditions)
    if (data.currentConditions.conditions.toLowerCase().includes("cloud")){
        imglogo.src = "cloudy.svg"
    }
    else if (data.currentConditions.conditions.toLowerCase().includes("rain")){
        imglogo.src = "rain.svg"
    }
    else if (data.currentConditions.conditions.toLowerCase().includes("snow")){
        imglogo.src = "snow.svg"
    }
    else if (data.currentConditions.conditions.toLowerCase().includes("clear")){
        imglogo.src = "clear.svg"
    }
    else if (data.currentConditions.conditions.toLowerCase().includes("overcast")){
        imglogo.src = "overcast.svg"
    }
    else if (data.currentConditions.conditions.toLowerCase().includes("humid")){
        imglogo.src = "humid.svg"
    }
    else{
        imglogo.src = "else.svg"
    }
    f = 0;
    document.querySelectorAll(".dayTemp").forEach((e, f) => {
        f++;
        day =  document.querySelector(`.day${f}`)
        
        e.innerHTML = data.days[f].temp;
        if (data.days[f].conditions.toLowerCase().includes("cloud")){
            day.src = "cloudy.svg"
        }
        else if (data.days[f].conditions.toLowerCase().includes("rain")){
            day.src = "rain.svg"
        }
        else if (data.days[f].conditions.toLowerCase().includes("snow")){
            day.src = "snow.svg"
        }
        else if (data.days[f].conditions.toLowerCase().includes("clear")){
            day.src = "clear.svg"
        }
        else if (data.days[f].conditions.toLowerCase().includes("overcast")){
            day.src = "overcast.svg"
        }
        else if (data.days[f].conditions.toLowerCase().includes("humid")){
            day.src = "humid.svg"
        }
        else{
            day.src = "else.svg"
        }
    });
    console.log(data);
}

async function main() {
    search.addEventListener("keypress", async function (e) {
        if (e.key === "Enter") {
            loc = search.value;
            await getWeather(loc);
        }
    });
    go.addEventListener("click", async function (e) {
        loc = search.value;
        await getWeather(loc);
    })
}

main();

function degToCompass(num) {
    let val = Math.floor(num / 22.5 + 0.5);
    let arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ];
    return arr[val % 16];
}