let tasksDone=0, streak=0;

function addtask() {
  let task = document.getElementById("taskInput").value.trim();
  let minutes=parseInt(document.getElementById("taskTimeInput").value);
  if(!task || minutes<1) 
    return;
  
  let li = document.createElement("li");
  li.innerHTML= `<span>${task} - <span class="timerDisplay">${minutes}:00</span></span>
  <div>
    <input type="number" class="customMinutes" value="${minutes}" min="1" style="width:50px">
    <button onclick="startTaskTimer(this)">Start</button>
    <button onclick="completeTask(this)" class="completeBtn" disabled>✅</button>
  </div>`;
  
  document.getElementById("taskList").appendChild(li);
  document.getElementById("taskInput").value="";
  document.getElementById("taskTimeInput").value=25;
}

function completeTask(btn){
  if(btn.disabled) return;
  let li=btn.parentElement.parentElement;
  li.classList.toggle("completed");
  tasksDone = Array.from(document.querySelectorAll("li.completed")).length;
 
  document.getElementById("tasksDone").innerText=tasksDone;
  updateProgressBar();
}

function startTaskTimer(btn){
  let li=btn.parentElement.parentElement;
  let input=li.querySelector(".customMinutes");
  let display=li.querySelector(".timerDisplay");
  let completeBtn=li.querySelector(".completeBtn");
  let time=parseInt(input.value)*60;
  btn.disabled=true;
  completeBtn.disabled=true;
  
  let interval=setInterval(()=>{
    let m=Math.floor(time/60),
        s=time%60;
    display.innerText=`${m}:${s<10?'0'+s:s}`;
    time--;
    if(time<0){ 
      clearInterval(interval);
      btn.disabled=false;
      completeBtn.disabled=false;
      streak++;
      document.getElementById("streak").innerText = streak;
      alert("focus session complete! 🎉");
    }
  },1000);
}
                            
function updateProgressBar(){
  let total=document.getElementById("taskList").children.length;
  document.getElementById("progressBar").style.width=total? ((tasksDone/total)*100)+"%" : "0%";
}
