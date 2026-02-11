const loginForm = document.getElementById('loginForm');
const email_l = document.getElementById('email_l');
const password_l = document.getElementById('password_l');


loginForm.addEventListener("submit",async(event)=>{
    event.preventDefault();
    const email=email_l.value
    const password=password_l.value
    const user={
        email:email,
        password:password
    }
    try{
        const response=await fetch("http://localhost:3001/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        const data=await response.json()
        if(response.status === 200){
        localStorage.setItem("token", data.token);
        console.log("LOGGED IN  SUCCESFULLY",data.message)
        alert("Login Successfull")
        email_l.value="";
        password_l.value="";
        window.location.href="tasks.html"
            }

        else {
            alert("Invalid Credentials")
        }
    } catch (err) {
        console.log('Login Error', err)
    }
})
