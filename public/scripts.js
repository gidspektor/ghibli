
let review = document.querySelectorAll(".score")
let card = document.querySelectorAll(".card")
let yourReview = document.querySelectorAll(".yourScore")
let select = document.querySelectorAll(".sel")
let best = document.querySelectorAll(".best")
let home = document.querySelectorAll(".home")
let searchButton = document.querySelectorAll(".searchSubmit")
let searchBox = document.querySelectorAll(".search")
let userBest = document.querySelectorAll(".userBest")

card.forEach(function (movie) {
    movie.addEventListener("click", function () {
            displayScore(movie, review)
            displayUserScore(movie, yourReview)
    })
})

searchButton.forEach(function(button) {
    button.addEventListener("click", function () {
        searched(searchBox, function(searched) {
         search(card, searched)   
        })
    })
})

best.forEach(function (button) {
    button.addEventListener("click", function() {
            displayTopMovies(card)
    })
})

userBest.forEach(function (button) {
    button.addEventListener("click", function() {
            displayUsersTopMovies(card)
    })
})

home.forEach(function(button) {
    button.addEventListener("click", function () {
        reset(card)
    })
})

let searched = (searchBox, callback) => {
    searchBox.forEach(function(searched) {
        callback(searched.value)
    })
}

let search = (card, searched) => {
    card.forEach(function (element) {
        element.style.display = "block"
        if (!element.dataset.title.match(searched)) {
            element.style.display = "none"
        }
    })
}

let displayScore = (movie, review) => {
    review.forEach(function (score) {
        if (movie.dataset.title === score.dataset.title) {
            score.style.display = "block"
        } else {
            score.style.display = "none"
        }
    })
}

let displayUserScore = (movie, youReview) => {
    youReview.forEach(function (score) {
        if (movie.dataset.title === score.dataset.title) {
            score.style.display = "block"
        } else {
            score.style.display = "none"
        }
    })
}
   
let displayTopMovies = (card) => {
    card.forEach(function(mov) {
    mov.style.display = "none" 
    if (mov.dataset.rt_score > 95) {   
                mov.style.display = "block"            
         }
    })   
}

let displayUsersTopMovies = (card) => {
    card.forEach(function(mov) {
        if (mov.dataset.user_score == 0 || !mov.dataset.user_score > 7) {
            mov.style.display = "none"
        }
    })
}

let reset = (card) => {
    card.forEach(function(mov) {
        mov.style.display = "block"
    })
}