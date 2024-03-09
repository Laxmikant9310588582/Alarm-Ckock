const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),   
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button"),
alarmListDiv=document.querySelector(".alarm-list");
const alarmsArr=[];
let alarmTime="01:03 PM";
// ringtone = new audio ("alarm ringtone.mp3");

for(let i=12; i>0; i--){
    i=i<10?"0" + i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);

}
for(let i=59; i>=0; i--){
    i=i<10 ? "0" + i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);

}
for(let i=2; i>0; i--){
   let ampm = i == 1 ? "AM" :"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend",option);

}

setInterval(() => {
   //getting hour,mins,secs
   let date= new Date(),
   h= date.getHours(),
   m=date.getMinutes(),
   s=date.getSeconds(),
   ampm = "AM";

   if(h>=12){
    h = h - 12;
    ampm = "PM"; 
   }
   //if hour value is 0, set this value to 12
   h = h == 0 ? 12 : h;
   //adding 0 before hr, min, sec if this value is less than 10
   h = h < 10 ? "0" + h : h;     
   m = m < 10 ? "0" + m : m;
   s = s < 10 ? "0" + s : s;

   currentTime.innerText =`${h}:${m}:${s} ${ampm}`;
   alarmsArr.forEach((alarmTime, index)=>{
    if(alarmTime == `${h}:${m}:${s} ${ampm}`){
        alert("Alarm ringing ...");
        alarmsArr.splice(index, 1);
        displayAlarms();
    }
   })

}, 1000);
function setAlarm(){
    //getting hour, minute, ampm select tag value 
    let time = `${selectMenu [0].value}:${selectMenu [1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    if(time.includes("Hour") || time.includes("Minute")||time.includes("AM/PM")){
        return alert("please,select a valid time to set Alarm!");  
    }
    const index=alarmsArr.findIndex((alarm)=>alarm==time);
    if(index==-1)
        alarmsArr.push(time);
    displayAlarms();
}
setAlarmBtn.addEventListener("click",setAlarm);

function displayAlarms()
{
    alarmListDiv.innerHTML="";
    alarmsArr.forEach(alarm=>{
        const element=document.createElement("div");
        element.classList.add("alarm");
        const p=document.createElement("p");
        p.textContent=alarm;
        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
    
        element.append(p, deleteBtn);
        alarmListDiv.append(element);
        
        
        
        deleteBtn.addEventListener("click", (e)=>{
            // alert("click");
            const parent= e.target.parentElement;
            const alarm=parent.children[0].textContent;
            const index=alarmsArr.findIndex(time=>alarm==time);
            alarmsArr.splice(index, 1);
            displayAlarms();
        });
    });
}


