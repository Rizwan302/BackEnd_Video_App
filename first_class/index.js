require('dotenv').config();

const express = require('express');
const app = express()
const port = 4000

app.get('/', (req, res)=>{
    res.send('hello express')
})

app.listen(process.env.PORT_URL, ()=>{
    console.log(`Example app listening on port ${port}`)
})