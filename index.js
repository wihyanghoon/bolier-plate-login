const express = require('express') // express 가져오기
const app = express()
const port = 5000

// 몽고디비 연결하는 mongoose 가져오기
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wihyanghoon:front95@cluster0.pnevfsg.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!~~안녕하세요')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})