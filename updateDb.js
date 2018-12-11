
module.exports.updateDb = (db,req) => {
    console.log(req.query)
     db.collection('movies').update({
        $set: {
            "movies": req.query
        }
    })
}