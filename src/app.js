const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log('hello')


const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shreya Bhat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shreya Bhat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shreya Bhat',
        content: 'Want help? You have come to the right place'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error: 'Please provide a location'
        })
    } else {
        geoCode(req.query.location, (error, { latitude, longitude, location } = {}) => {
            if(error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }
                res.send({
                    location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shreya Bhat',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shreya Bhat',
        errorMessage: 'Page not found.'

    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

