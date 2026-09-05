
import { showError, clearError } from "./utils.js"

const inputTask = document.getElementById('task')
const buttonAdd = document.getElementById('add-task')
const taskList = document.getElementById('tasks-list')

buttonAdd.addEventListener("click", () => {
    const taskName = inputTask.value.trim()

    function createTask(){

    const checkButton = document.createElement('button')
    checkButton.classList.add('check-button')
    
    const newTask = document.createElement("li")
    const newTaskText = document.createElement('span')
    newTaskText.textContent = taskName

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'

    newTask.appendChild(checkButton)
    newTask.appendChild(newTaskText)
    newTask.appendChild(deleteButton)
    taskList.appendChild(newTask)
    

    checkButton.addEventListener('click', () => {
        checkButton.classList.toggle('completed')
        newTaskText.classList.toggle('completed-task')

        if(checkButton.classList.contains('completed')){
            checkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>'
        } else {
            checkButton.innerHTML = ''
        }
    })

    deleteButton.addEventListener('click', () => {
        newTask.remove()
    })

}

    if(taskName === ''){
        showError(inputTask, "Digite uma tarefa.")
        return
    }

    clearError(inputTask)

createTask()

    inputTask.value = ''

})