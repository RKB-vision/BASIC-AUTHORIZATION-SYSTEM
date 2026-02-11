const registerForm = document.getElementById('registerForm');

const email_r = document.getElementById('email_r');
const password_r = document.getElementById('password_r');

registerForm.addEventListener("submit",async(event)=>{
    event.preventDefault();
    const email=email_r.value
    const password=password_r.value
    const user={
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
                                   }
        else{
            alert("Email Already registered")
            }
    } catch (err) {
        console.log('Registry Error', err)
    }

})



