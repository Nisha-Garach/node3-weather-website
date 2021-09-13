const request = require('request')
const forecast = (latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=17cd8ce722450d1235de4e5b9b49e776&query=' + latitude + ',' + longitude +'&units=f'     //weatherstack api
    // request({url:url,json:true},(error, response)=>{
    //     if(error){
    //         callback("Unable to connect to Weather service",undefined)
    //     }else if(response.body.error){
    //         callback("Unable to find location",undefined)
    //     } else{
    //         callback(undefined,"It is " + response.body.current.weather_descriptions[0]+". It is currently " + response.body.current.temperature + " degree out. It feels like " + response.body.current.feelslike + " degrees out.")
    //     }
    // })


    //using shorthand method
    request({url,json:true},(error, {body})=>{
        if(error){
            callback("Unable to connect to Weather service",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        } else{
            callback(undefined,"It is " + body.current.weather_descriptions[0]+". It is currently " + body.current.temperature + " degree out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports=forecast