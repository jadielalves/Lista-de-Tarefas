
import { showError, clearError, hideItem, showItem } from "./utils.js"

const titleMyTask = document.getElementById('title')
const inputTask = document.getElementById('task')
const inputHour = document.getElementById('hour')
const taskList = document.getElementById('tasks-list')

const newTaskButton = document.getElementById('new-task-button')
const cancelButton = document.getElementById('cancel-button')
const addButton = document.getElementById('add-button')
const taskDialog = document.getElementById('task-dialog')

const emptyList = document.getElementById('empty-list')

const tasks = []

function updateEmptyList(){

    emptyList.innerHTML = ''

    if(tasks.length === 0){
    hideItem(titleMyTask)
    hideItem(newTaskButton)
    
    const noTaskImage = document.createElement('img')
    noTaskImage.src = '/images/clipboard.png'
    noTaskImage.alt = ''
    noTaskImage.classList.add('no-task-image')

    const noTaskTitle = document.createElement('h1')
    noTaskTitle.classList.add('no-task-title')
    noTaskTitle.innerHTML = 'Seus pensamentos, sem estrutura'

    const noTaskSubtitle = document.createElement('p')
    noTaskSubtitle.classList.add('no-task-subtitle')
    noTaskSubtitle.innerHTML = 'Nem tudo precisa ficar na sua <br> cabeça. Coloque seus planos em ordem e <br> acompanhe o que realmente importa.'

    const addFirstTaskButton = document.createElement('button')
    addFirstTaskButton.classList.add('add-firsttask-button')
    addFirstTaskButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00cfff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg> <span>Adicionar Nova Tarefa</span>'

    addFirstTaskButton.addEventListener("click", () => {
        taskDialog.showModal()
    })

    emptyList.appendChild(noTaskImage)
    emptyList.appendChild(noTaskTitle)
    emptyList.appendChild(noTaskSubtitle)
    emptyList.appendChild(addFirstTaskButton)

    }
    if(tasks.length > 0){
        showItem(titleMyTask)
        showItem(newTaskButton)
    }
}


function addCheckIcon(button){
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>'
}

function createTask(task){
    const splitHour = task.hour.split(':')

    const hour = Number(splitHour[0])
    const minutes = splitHour[1]


    const checkButton = document.createElement('button')
    checkButton.classList.add('check-button')
    if(task.completed){
        checkButton.classList.add('completed')
        addCheckIcon(checkButton)
    }
    
    
    const newTask = document.createElement("li")
    const newTaskText = document.createElement('span')
    newTaskText.textContent = task.name
    if(task.completed){
        newTaskText.classList.add('completed-task')
    }

    const newTaskHour = document.createElement('span')
    if(hour < 12){
        newTaskHour.textContent = `${task.hour} AM`
    }
    else if(hour === 12){
        newTaskHour.textContent = `${task.hour} PM`
    }
    else{
        const hourPM = hour - 12
        const formattedHour = String(hourPM).padStart(2, '0')
        newTaskHour.textContent = `${formattedHour}:${minutes} PM`
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
        saveTasks(tasks)
    })

    

    deleteButton.addEventListener('click', () => {

        const index = tasks.indexOf(task)

        tasks.splice(index, 1)
    
        newTask.remove()

        saveTasks(tasks)

        updateEmptyList()
    })

}

function saveTasks(tasks){
    const tasksStringify = JSON.stringify(tasks)
    localStorage.setItem('tasks', tasksStringify)
}

function loadTasks(){
    const tasksStorage = localStorage.getItem('tasks')

    let taskData;

    if(tasksStorage){
        taskData = JSON.parse(tasksStorage)
        taskData.forEach(task => {
            tasks.push(task)
        
        createTask(task)
        });
    }
}

newTaskButton.addEventListener('click', () => {
        taskDialog.showModal()
    })

addButton.addEventListener('click', () => {
    const taskName = inputTask.value.trim()
    const taskHour = inputHour.value

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

    tasks.push(task)
    saveTasks(tasks)

    clearError(inputHour)

    inputTask.value = ''
    inputHour.value = ''

    createTask(task)

    updateEmptyList()

    taskDialog.close()
})

cancelButton.addEventListener('click', () => {
    taskDialog.close()
    
})

loadTasks()

updateEmptyList()