
module.exports.grabUser = (db, email, callback) => {
    let collection = db.collection(email)
    collection.find({}).toArray(function (err,docs) {
        callback(docs)  
    })  
}