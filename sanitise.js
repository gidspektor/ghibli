var email = document.getElementsByClassName('email')

$('#body').on("submit",function(e){
    emailValid(email,e)
})

function emailValid(field,event) {
    var emailReg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    for(i=0;i<field.length;i++){
        if (field[i].value === '') {
            field[i].style.background = "red"
            event.preventDefault()
        } else if (!field[i].value.match(emailReg)) {
            field[i].style.background = "red"
            event.preventDefault()
        }
    }
}