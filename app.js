document.addEventListener("DOMContentLoaded" , ()=> {
  const storedTask = JSON.parse(localStorage.getItem('task'));
  if(storedTask) {
    storedTask.forEach((task)=> {
      task.push(task)
     });
     updateTaskList();
     updateStates();

  }
})
// task[] to store task enter by user
let task=[];
// take task from lerner
const addTask = ()=>{
  const taskInput = document.querySelector("#taskInput");
  const text = taskInput.value.trim();// if lerner enter only space then trim it.
  if(text) {
    task.push({
      text:text , 
      completed :false
    });
    taskInput.value="";
    updateTaskList();
    updateStates();
    saveTask();
  }
}
const saveTask =()=> {
  localStorage.setItem('task' , JSON.stringify(task));
}

const toggleTaskList = (index)=> {
  task[index].completed = !task[index].completed;
  updateTaskList(); 
  updateStates();
  saveTask() ;
};
const deleteTask = (index) => {
  task.splice(index , 1);
  updateTaskList();
  updateStates();
  saveTask() ;
}
const editTask = (index) => {
  const taskInput = document.querySelector("#taskInput");
  taskInput.value = task[index].text;
  task.splice(index , 1);
  updateTaskList();
  updateStates();
  saveTask() ;
}
const updateStates = ()=> {
  const completeTask = task.filter(task => task.completed).length;
  const totalTask = task.length;
  const progress = (completeTask / totalTask) * 100;
  const progressBar = document.querySelector("#progress");
  progressBar.style.width = `${progress}%`;
  document.querySelector("#number").innerText = `${completeTask} / ${totalTask}`;
  if(task.length && completeTask === totalTask) {
    blaskConfetti();
  }
}
const updateTaskList = ()=> {
  const taskList = document.querySelector(".addTask");
  taskList.innerHTML="";
  task.forEach((task , index)=> {
    const li = document.createElement("li");
    li.innerHTML = `
  <div class="taskItem">
    <div class="task ${task.completed ? "completed" : ""}">
      <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} >
      <p class="para"> ${task.text} </p>
      <div class="icons">
        <img class="img" src="images/icon.png" onClick="editTask(${index})"/>
        <img class="img" src="images/delete.png" onClick="deleteTask(${index})"/>
      </div>
    </div>
  </div>
`;
 li.addEventListener('change' , ()=>{
  toggleTaskList(index)
 });
   taskList.appendChild(li);
    });
    };
 //  Select button 
 const newTask = document.querySelector("#newTask");
 // click the button then addtask();
 newTask.addEventListener("click" , function(event){
  event.preventDefault();
  addTask();
});

const  blaskConfetti = ()=> {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  });
}