const express = require('express') // express 가져오기
const app = express()
const port = 5000

// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User') // 유저 스키마 가져옵니다.
const config = require('./config/key') // 몽고디비 키값
// 바디파서 사용할 필요 없어짐
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// 이 코드로 변경됨
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// 몽고디비 연결하는 mongoose 가져오기
const mongoose = require('mongoose')
const { json } = require('body-parser')
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

    user.save((err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                message: '해당하는 유저가 없습니다.'
            })
        }
        // 비밀번호 맞는지 확인합니다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ message: '비밀번호가 틀렸습니다.' })
            }
            // 비밀번호까지 맏다면 토큰을 생성한다.
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).send(err);
                }
                // 토큰을 저장한다. 쿠키, 로컬스토리지 등에 저장 가능하다.
                res.cookie('x-auth', user.token)
                    .status(200)
                    .json({ userId: user._id })
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})