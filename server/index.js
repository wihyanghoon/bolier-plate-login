const express = require('express') // express 가져오기
const app = express()
const port = 5000

// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User') // 유저 스키마 가져옵니다.
const { auth } = require('./middleware/auth') // auth 미들웨어 가져오기
const config = require('./config/key') // 몽고디비 키값

// 몽고디비 연결하는 mongoose 가져오기
const mongoose = require('mongoose')
const { json } = require('body-parser')

// 바디파서 사용할 필요 없어짐
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// 이 코드로 변경됨
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!!')
})

//  라우터 생성

app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res) => {

    // console.log('ping')
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {

        // console.log('user', user)
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            // console.log('err',err)

            // console.log('isMatch',isMatch)

            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            //비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})