const express=require("express")
const http=require("http")
const path = require("path");
const bodyParser = require("body-parser");

const app=express()
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname));

app.get("/weather" ,(request, response)=>{
    response.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/', (request, response)=>{
    
const city = request.body.cityName
const Api = `a3c382ac979a164ea841d35633f03f3f`
const ApiUrl=`http://api.weatherstack.com/current?access_key=${Api}&query=${city}`

http.get(ApiUrl,(res)=>{
    res.on("data", (data) => {
        const weather_data = JSON.parse(data)
        const temp = weather_data.current.temperature;
        const CityName = weather_data.location.name;
        const description = weather_data.current.weather_descriptions.join(', ');
        response.send(`
            
            <div class="main-container">
                <div class=heading-container>
                    <h1 class="Heading">Weather Report for ${CityName}</h1>
                    <p>Temperature: ${temp}°C</p>
                    <p>Description: ${description}</p>
                </div>
            </div>
        `);
    })
})

})


app.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000");
})