
let review = document.querySelectorAll(".score")
let card = document.querySelectorAll(".card")
let yourReview = document.querySelectorAll(".yourScore")
let select = document.querySelectorAll(".sel")

card.forEach(function (movie) {
    let count = 0
    movie.addEventListener("click", function () {

            displayScore(movie, review, count)
            displayUserScore(movie, yourReview, count)
        count = 1
    })
})

document.getElementById("searchSubmit").addEventListener("click", function () {
    let card = document.querySelectorAll(".card")
    let searchBox = document.getElementById("search")
    let searched = searchBox.value
    card.forEach(function (element) {
        element.style.display = "block"
        if (!element.dataset.title.match(searched)) {
            element.style.display = "none"
        }
    })
})

let displayScore = (movie, review, count) => {
    review.forEach(function (score) {
        if (movie.dataset.title === score.dataset.title && count === 0) {
            movie.style.height = "500px"
            score.style.display = "block"
        } else {
            score.style.display = "none"
            movie.style.height = ""
        }
    })
}

let displayUserScore = (movie, yourReview, count) => {
    yourReview.forEach(function (input) {
        if (movie.dataset.title === input.dataset.title && count === 0) {
            input.style.display = "block"
        }
        else {
            input.style.display = "none"

        }
    })
}
