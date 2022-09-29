const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10; // 10자리

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 스페이스 제거
        unique: 1 // 유니크한 값 똑같은 값은 사용하지 못하게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관라지인지 유저인지
        type: Number,
        dfatult: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // 토근 사용유효 기간
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next();
    }
}) // 데이터 저장전에 무엇을 한다.

userSchema.methods.comparePassword = function (plainPasssword, done) {
    bcrypt.compare(plainPasssword, this.password, function (err, isMatch) {
        if (err) return done(err)
        done(null, isMatch)
    })
}

userSchema.methods.generateToken = function (done) {
    //jwt 이용해서 토큰생성
    let token = jwt.sign(this._id.toHexString(), 'secretToken')

    this.token = token
    this.save(function (err, user) {
        if (err) {
            return done(err)
        }
        done(null, user)
    })
}

const User = mongoose.model('user', userSchema) // 스키마를 모델로 감싸줌

module.exports = { User } // 다른곳에서도 사용할수 있도록 export 시킨다.