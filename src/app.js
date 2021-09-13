const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views') //views foldername = templates which is in the public folder or anywhere in this web-server folder or anyother name like templates not views
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(publicDirectoryPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('',(req,res) => {
//     // res.send('Hello Express!!')
//     res.send('<h1>Hello Express!!</h1>')
// })                                           //there is no need to write here because it's already called from index.html

// app.get('/help',(req,res)=>{
//     // res.send('Help Page')

//     // res.send({
//     //     name: 'Nisha',
//     //     age:22
//     // })

//     // res.send([
//     //     {
//     //         name: 'Nisha',
//     //     },
//     //     {
//     //         name: 'Vrushtee',
//     //     }
//     // ])
// })

// app.get('/about',(req,res) =>{
//     // res.send('About Page')
//     res.send('<h1>About Page</h1>')
// })


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index',{
        title:'Home Page',
        name:'Nisha'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Nisha'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Can I help you?',
        name: 'Nisha'
    })
})

app.get('/weather', (req,res) => {
    // res.send('Weather Page')

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{ latitude, longitude,location }={})=>{                          //callback chaining
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude,longitude, (error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            // console.log(location)
            // console.log(forecastData)

            res.send({
                forecast: forecastData,
                location: location,
                address:req.query.address
            })
        })
        
    })

    // console.log(req.query.address)

    // res.send({
    //     forecast: 23.22,
    //     location: 'Gandhinagar',
    //     address:req.query.address
    // })
})

app.get('/products', (req,res) => {
    // res.send('Weather Page')

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nisha',
        message: 'Help artical not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nisha',
        message: 'Page Not Found'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.')
})