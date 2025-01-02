// getting data from local localStorage
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach(task => {
          tasks.push(task)
          updateTaskList();
        });
    }
});

let tasks = [];

//save taskList

const saveTaskList = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById("task-input");
    const text = taskInput.value;

    if (text) {
        tasks.push({ text: text, completed: false });
        console.log(tasks);
        taskInput.value='';
         updateTaskList();
         saveTaskList();

    }
    else
    alert("Please enter a task");
}
 // toggle completed task
  const toggleCompleted = (index) => {
      tasks[index].completed = !tasks[index].completed;
      console.log(tasks);
      updateTaskList();
      saveTaskList();
  }


  // delete task
  const deleteTask = (index) => {
    tasks.splice(index, 1);
    console.log(tasks);
    updateTaskList();
    saveTaskList();
  }

  // edit task
  const editTask = (index) => {
    const taskInput = document.getElementById("task-input");
    taskInput.value = tasks[index].text;

    tasks.splice(index,1)
    updateTaskList();
    saveTaskList();
    
  }


const updateTaskList = () => {
    taskList = document.getElementById("task-list");
    taskList.innerHTML='';
    tasks.forEach((task,index) => {

        const listItem = document.createElement("li");
        

        listItem.innerHTML = `
          <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ''}">
              <input type="checkbox" class="checkbox" ${task.completed? "checked" : ""} />
              <p>${task.text}</p>
            </div>
            <div class="icons">
               <img src="./images/edit.png" alt="" onclick="editTask(${index})" />
               <img src="./images/bin.png" alt="" onclick="deleteTask(${index})"/>
            </div>
          </div>`;

        listItem.addEventListener("change", ()=> toggleCompleted(index));
        taskList.append(listItem);

     });


 }

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});