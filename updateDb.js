
module.exports.updateDb = (db,req) => {
    Object.keys(req.body).forEach((key) => {
        if (req.body[key] == 5) {
            db.collection('movies').updateOne({title: key}, 
            {$inc: {5: 1}})
        } 
        else if (req.body[key] == 4) {
            db.collection('movies').updateOne({title: key}, 
            {$inc: {4: 1}})
        }
        else if (req.body[key] == 3) {
            db.collection('movies').updateOne({title: key}, 
            {$inc: {3: 1}})
        }
        else if (req.body[key] == 2) {
            db.collection('movies').updateOne({title: key}, 
            {$inc: {2: 1}})
        }
        else if (req.body[key] == 1) {
            db.collection('movies').updateOne({title: key}, 
            {$inc: {1: 1}})
        }
        })
    }