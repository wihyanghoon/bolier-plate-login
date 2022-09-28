const mongoose = require('mongoose')

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

const User = mongoose.model('user', userSchema) // 스키마를 모델로 감싸줌

module.exports = { User } // 다른곳에서도 사용할수 있도록 export 시킨다.