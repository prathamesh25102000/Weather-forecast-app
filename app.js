const express = require("express")
const https = require("https")
const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.urlencoded({extended: true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){

    const query = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=50e37ce8692e3802462e8b5fa00af549"

    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const weatherDescription = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently "+weatherDescription+ "</p>")
            res.write("<h1>The temperature in "+query+" is "+temp+" fahrenheit<h1>")
            res.write("<img src=" + imageURL + ">")
            res.send()
        })
    })

})
    
app.listen(process.env.PORT || 3000,function(){
    console.log("App started successfully.")
})