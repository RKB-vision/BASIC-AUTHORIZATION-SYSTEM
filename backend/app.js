const UserModel = require("./models/user");
const TaskModel=require("./models/tasks")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const express=require("express")
const app=express();

const cors = require('cors');
app.use(cors());

//TO CONVERT DATA INTO READABLE FORMAT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",async (req,res)=>{
    res.json(await UserModel.find())
})

app.post("/register",async (req,res)=>{
    const email=req.body.email
    const password=req.body.password

    const user= await UserModel.findOne({email})
    if(user){
        return res.status(400).json({ message: "Email already registered" });
    }
    else{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password, salt);

        const new_id=await UserModel.create({
            email:email,
            password:hashedPassword
        })
        res.status(201).json(email)
    }

})
app.post("/login",async (req,res)=>{
    const email=req.body.email
    const password=req.body.password

    const user= await UserModel.findOne({email})
    if(user){   
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = jwt.sign(
            { id: user._id }, 
            "your_secret_key",
            { expiresIn: "1h" }
            );
            
            res.status(200).json({ message: "Login successful",token:token });
        }
        else{
            res.status(400).json({ message: "Invalid password" });
        }
    }
    else{
        return res.status(400).json({ message: "Email not registered" });
    }

})




function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        // Save the user ID from the token into the request for later use
        req.userId = decoded.id;
        next(); // This tells Express to move to the next function!
    });
}



//TASKS PART
app.get("/task",verifyToken,async (req,res)=>{
    const userTask= await TaskModel.find({owner:req.userId})
    res.json(userTask)
})

app.post("/create",verifyToken,async (req,res)=>{
    let content=req.body.content
    const NewTask= await TaskModel.create({content:content,owner:req.userId})
    res.json(NewTask)
})

app.delete('/delete/:id',verifyToken,async (req,res)=>{
    let id=req.params.id;
  try {
    // This finds the document by ID and removes it
    const deletedDoc = await TaskModel.findOneAndDelete({_id:id});

    if (!deletedDoc) {
      console.log("No record found with that ID.");
      return res.status(404).json({ message: "No record found" });
    }

    console.log("Successfully deleted:", deletedDoc);
    res.json(deletedDoc);

  } catch (error) {
    console.error("Error deleting record:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
) 

app.put("/update/:id",verifyToken,async (req,res)=>{
  let id=req.params.id;
  const newContent=req.body.content;
  try{
    const updatedTask=await TaskModel.findByIdAndUpdate(id, { content: newContent },{new:true})
    .then(()=>{
        console.log("Update successfull -DB")
    })
    res.json(updatedTask);
  }
  catch(error){
    console.log("Error updating data",error)
    res.status(500).json({ message: "Internal server error" });
  }
})


app.listen(3001,()=>{
    console.log("Server running on port 3001")
})
