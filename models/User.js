const db = require('../config/db')

class User {
  constructor() {}
  static saveUser(username, password) {
    const sql = `
INSERT INTO Users(username, password)
    VALUES( ? , ? )`
    return db.execute(sql, [username, password])
  }
  static findNewUser() {
    const sql = 'SELECT id, username FROM Users ORDER BY id DESC LIMIT 1'
    return db.execute(sql)
  }
  static findOneUser(id) {
    const sql = `SELECT * FROM Users WHERE id = ? `
    return db.execute(sql, [id])
  }

  static checkUserCred(username) {
    const sql = `SELECT * FROM Users WHERE username = ? `
    return db.execute(sql, [username])
  }
}

module.exports = User
