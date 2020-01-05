const db = require('./db')
const User = require('./user.js')
// require each of your models here...

// if applicable, associations go here


module.exports = {
  db, User
  // Include your models in your module.exports as well!
  // The seed file expects to find them there!
}
