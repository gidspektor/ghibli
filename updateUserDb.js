
module.exports.updateUserDb = (db, req, coll) => {
    Object.keys(req.body).forEach((key) => {
        db.collection(coll).updateOne({title: key}, {$set: {user_score: req.body[key]}})
    })
}