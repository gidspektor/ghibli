
module.exports.grabData = (db, callback) => {
    let collection = db.collection('movies')
    collection.find({}).toArray(function (err,docs) {
        console.log('found')
        callback(docs)
    })
}