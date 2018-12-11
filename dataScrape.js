
module.exports.dataScrape = async (db,fetch) => {
    let data = fetch('https://ghibliapi.herokuapp.com/films')
    await data
        .then((data) => {
            data.json()
                .then((data) => {
                    return db.collection('movie').insert({
                        "movies": data
                    }, function(err, result) {
                        console.log("Inserted an address into the places collection.")
                        console.log(result.ops)
                    })
                })
        })
}