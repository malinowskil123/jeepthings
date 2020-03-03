const bcrypt = require('bcryptjs'),
  img = require('../imgGenerator/imgGenerator')
module.exports = {
  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { username, password } = req.body
    let user = await db.check_user([username])
    user = user[0]
    if (!user) return res.status(401).send('username not found')
    const authenticated = bcrypt.compareSync(password, user.password)
    if (authenticated) {
      delete user.password
      session.user = user
      return res.status(202).send(session.user)
    } else return res.status(401).send('incorrect password')
  },
  register: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { username, password } = req.body
    let user = await db.check_user([username])
    user = user[0]
    console.log(user)
    if (user) return res.status(400).send('user already exists')
    const salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt)
    let newUser = await db.register_user([
      username,
      hash,
      img.generateRandomImg(),
      false
    ])
    newUser = newUser[0]
    session.user = newUser
    return res.status(201).send(session.user)
  },
  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send('sucessfully logged out')
  },
  getUser: (req, res) => {
    const { session } = req
    if (session.user) return res.status(202).send(session.user)
    else return res.status(500).send('please login')
  }
}