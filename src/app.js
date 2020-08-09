const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require(path.join(__dirname,'../src/utils/geocode.js'))
const forecast = require(path.join(__dirname,'../src/utils/forecast.js'))


const app=express()
//defining paths
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//Setting up paths
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

//creating the pages
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Dhruv'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Dhruv'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Dhruv',
        message:'hopefully help has been recieved'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){

        return res.send({
            error:'please enter an address'

        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error:"Enter a valid location"

            })
        }

        forecast(data.lattitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:"Network issues in connecting to weather services"
    
                })
            }
            res.send({
                forecast:forecastData,
                location:data.location,
                address:req.query.address
            })

        
            
        })
    })

})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        name:' dhruv',
        title:'error',
        error:'help article not found '
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        name:' dhruv',
        title:'error',
        error:'Error 404 page not found '
    })

})
//starting the server
app.listen(3000,()=>{
    console.log('server has been started')
})
