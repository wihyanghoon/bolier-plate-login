const express = require('express') // express 가져오기
const app = express()
const port = 5000

// const bodyParser = require('body-parser')
const { User } = require('./models/User') // 유저 스키마 가져옵니다.
const config = require('./config/key') // 몽고디비 키값
// 바디파서 사용할 필요 없어짐
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// 이 코드로 변경됨
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 몽고디비 연결하는 mongoose 가져오기
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!!')
})

//  라우터 생성
app.get('/register', (req, res) => {
    res.send('회원가입 라우터')
})

app.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 cilent에서 가져오면
    // 그것을 테이터 베이스에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})