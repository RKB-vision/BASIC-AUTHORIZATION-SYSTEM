//LOGIC FOR REGISTRATION

const registerForm = document.getElementById('registerForm');
const email_r = document.getElementById('email_r');
const password_r = document.getElementById('password_r');
const user_name=document.getElementById("username")

if(registerForm){
registerForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const email=email_r.value
    const password=password_r.value
    const user={
        name:user_name.value,
        email:email,
        password:password
    }
    try{
        const response=await fetch("http://localhost:3001/register",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        if(response.status === 201){
        console.log("REGISTRATION SUCCESFULL",await response.json())
        alert("Registration Successfull") 
        email_r.value="";
        password_r.value="";
        user_name.value="";

        window.location.href="login.html"
                                   }
        else{
            alert("Email Already registered")
            }
    } catch (err) {
        console.log('Registry Error', err)
    }

})}


//LOGIC FOR LOGIN
const loginForm = document.getElementById('loginForm');
const email_l = document.getElementById('email_l');
const password_l = document.getElementById('password_l');

if(loginForm){
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

        window.location.href="tasks.html" //change accordingly

            }

        else {
            alert("Invalid Credentials")
        }
    } catch (err) {
        console.log('Login Error', err)
    }
})}
