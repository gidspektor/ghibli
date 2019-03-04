
module.exports.fillUserTable = (db, user) => {
    db.collection("newUser").find({}).toArray(function (err, docs) {
        db.collection(user).insertMany(docs)
    })
}   