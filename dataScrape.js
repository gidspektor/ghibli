
module.exports.dataScrape = async (fetch, db) => {
    let data = fetch('https://ghibliapi.herokuapp.com/films')
    await data
        .then((data) => {
           data.json()
                .then((data) => {
                     db.collection('movies').insertMany(data)
                    .then(() => {
                        console.log('stored'),
                        db.close()
                    })
                })
        })
}