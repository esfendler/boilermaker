const sequelize = require('sequelize')
const db = require('./db.js')


const User = db.define('users', {
  email: {
    type: sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: sequelize.STRING,
    get(){
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: sequelize.STRING
  }
})

module.exports = User

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt){
  return crypto
  .createHash('RSA-SHA256')
  .update(plainText)
  .update(salt)
  .digest('hex')
}

const setSaltAndPassword = user => {
  if(user.changed('password')){
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
