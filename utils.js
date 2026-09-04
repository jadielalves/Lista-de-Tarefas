export function showError(field, message){

    const error = document.querySelector('.error')

    if(error){
        return
    }

    const newError = document.createElement("small")
    newError.classList.add('error')
    const errorText = document.createTextNode(message)

    newError.appendChild(errorText)

    field.insertAdjacentElement("afterend", newError)

}

export function clearError(field){
    const error = document.querySelector('.error')

    if(error){
        error.remove()
    }
}