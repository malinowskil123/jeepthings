module.exports = {
  updateProfileImg: async (req, res) => {
    const db = req.app.get('db')
    const { userId, newProfileImg } = req.body
    const { session } = req
    let profileImg = await db.update_profile_img([userId, newProfileImg])
    session.user.profile_img = profileImg[0].profile_img
    return res.status(200).send(session.user)
  }
}
