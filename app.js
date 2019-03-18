let news = document.getElementById("news")
let submitBtn = document.getElementById("submitBtn")
let zipInput = document.getElementById("zipInput")

submitBtn.addEventListener("click",function(){
    let zippers= zipInput.value
    console.log(zippers)
    let localWeather= `https://api.openweathermap.org/data/2.5/weather?zip=${zippers}&units=imperial&apiKey=5c532f33d76a318783dd01c47721de8e`
    fetch(localWeather)
    .then(response=>response.json())
        .then(json=>{console.log(json.main)
        console.log(json)
        //console.log(json.wind)
        //console.log(json.sys.sunset*1000)
        let sunset = new Date(json.sys.sunset*1000)
        let sunrise = new Date(json.sys.sunrise*1000)
        let windDirection = getDirection(json.wind.deg)
       //search inside the object in the array
        console.log(json.weather[0].main)


    //console.log(sunset)
    //console.log(sunrise)
    let weatherBug = `
    <h3> Weather from ${json.name}</h3>
    <h4> Current Temperature: ${json.main.temp} Deg</h4>
    <h4> Wind Speed : ${json.wind.speed} Mph;    Direction: ${windDirection}</h4>
    <h4> Sunrise: ${sunrise.toLocaleTimeString()} Sunset: ${sunset.toLocaleTimeString()}</h4>
    <h4> Current Conditions: ${json.weather[0].description}</h4>
    `
    weather.innerHTML=weatherBug
     let localNews= `https://gnews.io/api/v2/?q=${json.name}&token=114071df888d1c4880c2bff07c8ffc33`     
    //let Houston = `https://newsapi.org/v2/everything?sources=nbc-news&q=${json.name}+country=US&sortBy=popularity&apiKey=1a6cdc031db640ff9e62b8e0e7716746`
    fetch(localNews)
    .then(response=>response.json())
    
        .then(function(json){ return json
            
        })
        .then (function(json){
            console.log(json)
            let newsID = json.articles.map(function(news){
               // console.log(news)
                return `
                <li> ${news.title}</li>
                <a href = ${news.link}>Click to get story</a>
                <img src = ${news.image}>
        
            
                `
            }) 
    
            news.innerHTML=newsID.join("")
    
           
        })









})



})




//let HoustonWeather= "https://api.openweathermap.org/data/2.5/weather?zip=77445&units=imperial&apiKey=5c532f33d76a318783dd01c47721de8e"


//var url = 'https://newsapi.org/v2/everything?' +
            //'q=Houston+Texas=us' +
            //'sortBypopularity&' +
            //'apiKey=1a6cdc031db640ff9e62b8e0e7716746';

//var req = new Request(url);    
/*let texas = "https://gnews.io/api/v2/?q=houston&token=114071df888d1c4880c2bff07c8ffc33"
let Houston = `https://newsapi.org/v2/everything?q=Houston+US=US&sortBy=popularity&apiKey=9b1543ab0ee24e0a82cab9621ca9aa7b`
fetch(texas)
.then(response=>response.json())

    .then(function(json){ return json
        
    })
    .then (function(json){
        console.log(json)
        let newsID = json.articles.map(function(news){
            console.log(news)
            return `
            <li> ${news.title}</li>
            <a href = '${news.url}'>${news.url}</a>
    
        
            `
        }) 

        news.innerHTML=newsID.join("")

       
    })

    */
    



function getDirection(angle) {
    let directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
     
}

//console.log(getDirection(0))
//console.log(getDirection(90))
//console.log(getDirection(180))
//console.log(getDirection(270))
//console.log(getDirection(180))
//console.log(getDirection(45))
//console.log(getDirection(135))
//console.log(getDirection(225))
//console.log(getDirection(305))
