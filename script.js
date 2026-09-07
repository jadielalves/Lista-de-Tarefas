
import { showError, clearError } from "./utils.js"

const inputTask = document.getElementById('task')
const inputHour = document.getElementById('hour')
const taskList = document.getElementById('tasks-list')

const newTaskButton = document.getElementById('new-task-button')
const cancelButton = document.getElementById('cancel-button')
const addButton = document.getElementById('add-button')
const taskDialog = document.getElementById('task-dialog')


newTaskButton.addEventListener('click', () => {
        taskDialog.showModal()
    })

addButton.addEventListener('click', () => {
    const taskName = inputTask.value.trim()
    const taskHour = inputHour.value
    const splitHour = taskHour.split(':')

    const hour = Number(splitHour[0])
    const minutes = splitHour[1]

    if(taskName === ''){
        showError(inputTask, "Digite uma tarefa.")
        return
    }

    clearError(inputTask)

    if(taskHour === ''){
        showError(inputHour, "Digite um horário.")
        return
    }

    const task = {
        name: taskName,
        hour: taskHour,
        completed: false
    }

    clearError(inputHour)


    function createTask(){
    
    const checkButton = document.createElement('button')
    checkButton.classList.add('check-button')
    
    
    const newTask = document.createElement("li")
    const newTaskText = document.createElement('span')
    newTaskText.textContent = task.name

    const newTaskHour = document.createElement('span')
    if(hour < 12){
        newTaskHour.textContent = `${task.hour} AM`
    }
    else if(hour === 12){
        newTaskHour.textContent = `${task.hour} PM`
    }
    else {
        const hourPM = hour - 12
        newTaskHour.textContent = `0${hourPM}:${minutes} PM`
    }

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'

    newTask.appendChild(checkButton)
    newTask.appendChild(newTaskText)
    newTask.appendChild(newTaskHour)

    

    newTask.appendChild(deleteButton)
    taskList.appendChild(newTask)
    

    checkButton.addEventListener('click', () => {
        checkButton.classList.toggle('completed')
        newTaskText.classList.toggle('completed-task')

        if(checkButton.classList.contains('completed')){
            checkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>'
            task.completed = true
        } else {
            checkButton.innerHTML = ''
            task.completed = false
        }
    })

    deleteButton.addEventListener('click', () => {
        newTask.remove()
    })

    taskDialog.close()

}

createTask()

    inputTask.value = ''
    inputHour.value = ''

})

cancelButton.addEventListener('click', () => {
    taskDialog.close()
})