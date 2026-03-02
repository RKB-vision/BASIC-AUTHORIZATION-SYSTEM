
//EXTRACTING ELEMENTS FROM DOCUMENTS
const form=document.querySelector("#task-form")
let taskInput=document.querySelector("#task")
let taskList=document.querySelector("#task-list")
const token=localStorage.getItem("token")
const logoutBtn=document.querySelector("#logout-btn")
render();

//FORM PART
if(form){
form.addEventListener("submit",async (event)=>{
    event.preventDefault()

    const taskValue= taskInput.value.trim()
    if(taskValue===""){
        alert("Please enter a task")
        return
    }
    const res=await fetch("http://localhost:3001/create",{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'authorization':token
        },
        body:JSON.stringify({
            content:taskValue
        })

    })

    const data=await res.json()
    console.log("Sucessfully loaded data into the data base",data)

    taskInput.value="";

    render();
})}


//LOADING PART
async function render(){
    try {
        const res=await fetch("http://localhost:3001/task",{
            
        method: "GET",
        headers: {
            "Authorization": token // <--- SHOWING THE ID CARD
        }
        })
        const data=await res.json()

        let clutter=""
        data.forEach(task => {
            clutter+=`<li>${task.content}
                    <button data-id="${task._id}" class="del-btn">Delete</button>
                    <button data-id="${task._id}" class="edit-btn">Edit</button>
                    </li>`
        });
        taskList.innerHTML=clutter
    } catch (error) {
        console.error("Error fetching tasks:", error);
        taskList.innerHTML="<li>Error loading tasks. Please try again.</li>";
    }
}

//UPDATING and DELETING PART 
if(taskList){
taskList.addEventListener("click",async (details)=>{
    let id=details.target.dataset.id
    let class_name=details.target.classList

    if (class_name.contains("del-btn")){
        try {
            let lastwords=await fetch(`http://localhost:3001/delete/${id}`,{
                method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            }
            })
        render();
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Error deleting task. Please try again.");
        }
    }
    else if(class_name.contains("edit-btn")){
        try{
            const res  = await fetch(`http://localhost:3001/update/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
            content:prompt("Enter the new content")
        })
        })
        console.log("Data updated succesfully",res)
        render();
    }
    catch(error){
        console.log("Error updating data",error)
        alert("Error updating data!!! Try again later?")
    }}

})

logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("token")
    window.location.href="index.html"
}
)}