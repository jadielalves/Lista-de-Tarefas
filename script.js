const inputTask = document.getElementById('task')
const buttonAdd = document.getElementById('add-task')
const taskList = document.getElementById('tasks-list')

buttonAdd.addEventListener("click", () => {
    const taskName = inputTask.value.trim()

    function createTask(){
    
    const newTask = document.createElement("li")
    const newTaskText = document.createTextNode(taskName)

    newTask.appendChild(newTaskText)

    taskList.appendChild(newTask)
}

    if(taskName === ''){
        return alert('Escreva uma tarefa.')
    }

createTask()

})