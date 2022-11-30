const db = require('../config/db')
class Post {
  constructor() {}
  //static methods where i just pass parameters and query the data based on my needs
  static savePost(
    about,
    appearance,
    name,
    image,
    realName,
    gender,
    firstGame,
    lastGame,
    birthPlace,
    userId
  ) {
    const sql = `
INSERT INTO Posts(
    about,
    appearance,
    name,
    image,
    realName,
    gender,
    firstGame,
    lastGame,
    birthPlace,
    userId
    )
    VALUES(?,?,?,?,?,?,?,?,?,?)`
    return db.execute(sql, [
      about,
      appearance,
      name,
      image,
      realName,
      gender,
      firstGame,
      lastGame,
      birthPlace,
      userId,
    ])
  }
  static saveTrivia(id, trivia) {
    if (trivia == undefined) return trivia
    else {
      let sql = `INSERT INTO Trivia (text, postId) VALUES `
      if (trivia.length == 0) {
        return
      }
      for (let i = 0; i < trivia.length; i++) {
        sql = `${sql} ("${trivia[i]}", ${id}) `
        //how to concat with backticks
      }
      console.log(sql)
      return db.execute(sql)
    }
  }
  static getCurrentId() {
    const sql = 'SELECT MAX(id) FROM Posts'
    return db.execute(sql)
  }

  static getAllPostsNames() {
    const sql = 'SELECT name, image, id, userId FROM Posts'
    return db.execute(sql)
  }
  static findOnePost(id) {
    const sql = `SELECT * FROM Posts p WHERE p.id = ? `

    return db.execute(sql, [id])
  }

  static findTriviaByPost(id) {
    const sql = `SELECT * FROM Trivia WHERE postId = ? `
    return db.execute(sql, [id])
  }
  static updatePostRecord(record, value, id) {
    const sql = `UPDATE Posts
    SET ${record} = ?
    WHERE  id = ${id} `
    return db.execute(sql, [value])
  }
  static deleteTriviaRecord(postId) {
    const sql = `DELETE FROM Trivia WHERE postId = ${postId}`
    return db.execute(sql)
  }
  static updateTriviaRecord(value, id) {
    const sql = `INSERT INTO Trivia( text, postId ) VALUES( ? , ? ) `
    return db.execute(sql, [value, id])
  }
  static deletepOnePost(id) {
    const sql = `DELETE FROM Posts WHERE id = ?;`
    return db.execute(sql, [id])
  }
}

module.exports = Post
