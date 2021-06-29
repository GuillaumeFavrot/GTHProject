const express = require('express')
const router = express.Router()


router.get('/TempConv', (req, res) =>{
    res.render('TempConv')
})

router.get('/Calculator', (req, res) =>{
    res.render('Calculator')
})

router.get('/Pong', (req, res) =>{
    res.render('Pong')
})

router.get('/Snake', (req, res) =>{
    res.render('Snake')
})

router.get('/Index', (req, res) =>{
    res.render('Index')
})


module.exports = router