
module.exports.checkUser = (db, req, callback) => {
    Object.keys(req.body).forEach(key => {
        let collection = db.collection(req.body[key])
        collection.find({}).toArray(function (err,docs) {
            callback(docs, req.body[key])
        })    
    })
}