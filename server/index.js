

//Using Express
const express = require('express'); // Express framework use panni server set up pannum
const mongoose = require('mongoose');  // MongoDB database connect panna use ahum
const cors = require("cors"); 

const bodyParser = require('body-parser');  // Request body parsing (data handle panna use ahum), bodyParser & express.json: Request-la vanthirukka data parse panna usefull.
require('dotenv').config();  // Environment variables (like .env file la save pannadhu)

const app = express();   // Express app create pannum//

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend app URL access panna permission kudukkum
  methods: 'GET,POST,PUT,DELETE',  // HTTP methods like GET, POST, etc. support pannum
  credentials: true
}));


app.use(bodyParser.json());  // Request body la irundha JSON data handle pannan
app.use(express.json()); // JSON body data kooda handle pannum

//Connecting mongoDB
mongoose.connect(process.env.DATABASE_URL)

  .then(() => {
    console.log('Database Connected Successfully...!')
  })
  .catch((err) => {
    console.log(err)
  })

  

//Creating Schema
const taskSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String  // Task title mandatory
  },
  description: String ,  // Task description (optional)
  date:{
    type: Date, 
    default : Date.now  // Date automatically set aagum
  },
  status:{
    type : String,
    enum :['ToDo','In Progress','Completed'],
    default : 'ToDo'   // Task status options
  },
  createdAt : {
     type : Date,
     default : Date.now //Automatically task create panna create ahum //
  },
  isPinned : {
    type : Boolean,
    default : false   // Pin status
  },
  userId : {
    type : String,
    require : true    // User who created the task
  }
 
  
})


//Creating Schema for Users Collection
const userSchema = new mongoose.Schema({
  email : {
    type :String,
    required : true,
    unique : true    // Email (unique and mandatory)
  },
  uid: {
    type: String,
    required : true,
    unique : true      // User unique ID (required)
  },
  createdAt : {
    type : Date,
    default : Date.now   // Account creation date
  }
})


//Creating model
const TaskModel = mongoose.model('Task',taskSchema); // Task model create pannudhu
const UserModel = mongoose.model('User',userSchema)  // User model create pannudhu


//signup Route//

app.post ('/api/signup' , async (req,res) => {
   const {uid,email} = req.body;

   try {
       if (!uid || !email) {
        return res.status(400).json({error : "UID And Email are required"});

       }

       const NewUser = new UserModel({uid, email});
       await NewUser .save();
       res.status(201).json ({message : "User Saved Successfully"});
    
   } catch (error) {
      console.error("Error Saving User" , error );
      res.status(500).json({error : "Failed to Save User"})
   }

});






// Create a new Task item 
app.post('/tasks', async (req, res) => {
  const { userId,title, description} = req.body

  try {

    const newTask = new TaskModel({ userId ,title, description });
    await newTask.save();
    res.status(201).json(newTask);

  } catch (error) {
    console.log(error)
    res.status(500).json({ message:error.message })
  }




})



//Get all items

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel .find().sort({isPinned : -1 , createdAt : 1});
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })

  }

})



//pin//
app.put('/tasks/:id/pin', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Toggle pin status
        task.isPinned = !task.isPinned;
        await task.save();

        // Return the updated task
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Unable to update pin status' });
    }
});


// Update Task Item

app.put('/tasks/:id', async (req, res) => {

  try {

    const { title, description ,status} = req.body;
    const id = req.params.id;
    const updatedTask = await TaskModel .findByIdAndUpdate(
      id,
      {title, description,status},
      {new: true}
    )

    if (!updatedTask) {
      return res.status(404).json({ message:"Tasks not Found" })
    }

    res.json(updatedTask)

  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message })  
     
  }
})



//Delete a Task item 
app.delete('/tasks/:id' , async (req, res)=>{
  try {

    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id)
    res.status(204).end();
    
  } catch (error) {

    console.log(error)
    res.status(500).json({message:error.message });
    
  }

 

})

//Start the server

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running to port  ${PORT}`)
})