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
        trim: true, // 스페이스(띄워쓰기) 제거
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
    var user = this // 여기서 this는 userSchema를 말한다.

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

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + ''  = token
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('user', userSchema) // 스키마를 모델로 감싸줌

module.exports = { User } // 다른곳에서도 사용할수 있도록 export 시킨다.