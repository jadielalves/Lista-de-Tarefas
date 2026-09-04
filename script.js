
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

    newTask.appendChild(checkButton)
    newTask.appendChild(newTaskText)
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

}

    if(taskName === ''){
        showError(inputTask, "Digite uma tarefa.")
        return
    }

    clearError(inputTask)

createTask()

    inputTask.value = ''

})