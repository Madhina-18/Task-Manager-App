import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MdOutlinePushPin } from "react-icons/md";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import auth from '../config/firebase';


function DashBoard() {
  const [title, setTitle] = useState(""); // User Title State
  const [description, setDescription] = useState(""); // User Description State
  const [tasks, setTasks] = useState([]); // User gives his tasks array
  const [allTasks, setAllTasks] = useState([]); // User gives the task storage array
  const [search, setSearch] = useState(""); // Search field State
  const [error, setError] = useState(""); // Error state
  const [message, setMessage] = useState(""); // Message state timing based
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("ToDo"); // Status state
  const [sortBy, setSortBy] = useState("title"); // Sorting option (Title or Date)
  const [sortOrder, setSortOrder] = useState("asc"); // Ascending or Descending order
  const [filterStatus, setFilterStatus] = useState("ALL"); // Filter by Status (ALL, ToDo, In Progress, Completed)


  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  console.log(user)



  const apiUrl = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000';



// Fetch tasks on component mount


  useEffect(() => {
    const fetchTasks = async () => {

      window.scrollTo(0, 0);
      auth.onAuthStateChanged(function (user) {
        if (!user) {
          alert("Please login to access the dashboard")
          navigate('/login')
        }
      })

      try {

        const response = await axios.get(`${apiUrl}/tasks`);
        const userTasks = response.data.filter(task => task.userId === user.uid); // Filter tasks based on userId
        setTasks(userTasks); // Set only the current user's tasks
        setAllTasks(response.data); // Optional: Keep all tasks if needed for other operations
      } catch (error) {
        setError("Unable to fetch tasks.");
      }
      
    };
    fetchTasks();
  }, []);



  


//create task//
const handleSubmit = async () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        const response = await axios.post(`${apiUrl}/tasks`, {
          title,
          description,
          status: "ToDo",
          isPinned: false,
          userId: user.uid


        });
        if (response.status === 201 || response.status === 200) {
          const newTask = response.data;
          setTasks([...tasks, newTask]);
          setAllTasks([...allTasks, newTask]);
          setTitle("");
          setDescription("");
          setMessage("Task added successfully!");
          setTimeout(() => setMessage(""), 3000);
        }
      } catch (error) {
        setError("Unable to add task.");
      }
    } else {
      setError("Title and description cannot be empty.");
    }
  };




  // Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      setAllTasks(updatedTasks);
      setMessage("Task deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setError("Unable to delete task.");
    }
  };



// Update Task
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${apiUrl}/tasks/${editId}`, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
      });
      if (response.status === 200) {
        const updatedTask = response.data;
        const updatedTasks = tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);
        setAllTasks(updatedTasks);
        setEditId(null);
        setMessage("Task updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setError("Unable to update task.");
    }
  };



// Handle pinning of task 
  const handlePin = async (id) => {
    try {
      // Update the local tasks state with the new pin status
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, isPinned: !task.isPinned } : task
      );
  
      // Sort updated tasks so that pinned tasks come first
      const sortedTasks = updatedTasks.sort(
        (a, b) => {
          // First, sort by isPinned to have pinned tasks on top
          if (a.isPinned === b.isPinned) {
            // If both tasks are pinned or both are unpinned, sort by createdAt or any other field you prefer
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return b.isPinned ? 1 : -1; // Pinned tasks come first
        }
      );
  
      // Update both states with the sorted tasks
      setTasks(sortedTasks);
      setAllTasks(sortedTasks);
  
      // Update the pin status in the database
      const pinnedTask = updatedTasks.find((task) => task._id === id);
      await axios.put(`${apiUrl}/tasks/${id}/pin`, { isPinned: pinnedTask.isPinned });
    } catch (error) {
      setError("Unable to update pin status.");
    }
  };
  




// Handle search functionality

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue); // Set search value state
  
    // Check if user is logged in and allTasks has data
    if (user && allTasks.length > 0) {
      if (searchValue === "") {
        // If search field is empty, show all tasks for the logged-in user
        const userTasks = allTasks.filter((task) => task.userId === user.uid);
        setTasks(userTasks); // Set tasks for the logged-in user
      } else {
        // Filter tasks based on search value in title and userId
        const filteredTasks = allTasks.filter(
          (task) =>
            task.userId === user.uid && task.title.toLowerCase().includes(searchValue)
        );
        setTasks(filteredTasks); // Update tasks with filtered tasks
      }
    }
  };



// Sort tasks by title or date
  const handleSort = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
    setTasks(sortedTasks);
  };



// Filter tasks by status
  const handleFilterStatus = (status) => {
    setFilterStatus(status);

    // Check user-specific tasks and filter by status
    if (status === "ALL") {
      // Login panra user oda ella tasks um (all status) filter pananum
      const userTasks = allTasks.filter((task) => task.userId === user.uid);
      setTasks(userTasks);
    } else {
      // Login panra user oda selected status tasks mattum filter pananum
      const filteredTasks = allTasks.filter(
        (task) => task.status === status && task.userId === user.uid
      );
      setTasks(filteredTasks);
    }
  };




  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };







  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center  mb-6 font-serif">
        Task Management Dashboard
      </h1>
      {error && <p className="text-red-500 p-4 text-center">{error}</p>}
      {message && <p className="text-green-500 p-5 text-center">{message}</p>}




      {/* Add or Edit Task */}
      <div className="mb-6 bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-serif mb-4">
          {editId ? "Edit Task" : "Add New Task"}
        </h2>
        <input
          type="text"
          placeholder="Enter task title..."
          value={editId ? editTitle : title}
          onChange={(e) =>
            editId ? setEditTitle(e.target.value) : setTitle(e.target.value)
          }
          className="block w-full p-2 mb-4 border border-blue-500 focus:outline-none rounded-md"
        />
        <textarea
          placeholder="Enter task description..."
          value={editId ? editDescription : description}
          onChange={(e) =>
            editId
              ? setEditDescription(e.target.value)
              : setDescription(e.target.value)
          }
          className="block w-full border-blue-500 focus:outline-none p-2 mb-4 border rounded-md"
        />








        <button
          onClick={editId ? handleUpdate : handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {editId ? "Update Task" : "Add Task"}
        </button>


        {editId && (
          <button
            onClick={() => setEditId(null)}
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        )}
      </div>






      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
          className="block w-full p-2 border-blue-500 focus:outline-none border rounded-md"
        />
      </div>





      {/* Sorting and Filtering */}
      <div className="flex gap-6 mb-6  flex-wrap focus:outline-none ">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-blue-500 p-2 rounded-md focus:outline-none"
        >
          <option value="title">Sort by Title</option>
          <option value="date">Sort by Date</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-blue-500 p-2 rounded-md focus:outline-none "
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          onClick={handleSort}
          className="bg-blue-500 text-white px-4 py-2 rounded-md border border-gray-500  hover:bg-blue-600"
        >
          Sort
        </button>
        <select
          value={filterStatus}
          onChange={(e) => handleFilterStatus(e.target.value)}
          className="border border-blue-500 p-2 rounded-md focus:outline-none "
        >
          <option value="ALL">All</option>
          <option value="ToDo">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>




      {/* Task List */}
      <div>
        {tasks
          .sort((a, b) => b.isPinned - a.isPinned) // Sort pinned tasks to the top
          .map((task) => (
            <div
              key={task._id}
              className="border p-4 mb-4 rounded-md shadow-md"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-600">
                    Date Created: {formatDate(task.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {task.status}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handlePin(task._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MdOutlinePushPin
                      size={20}
                      color={task.isPinned ? "gold" : "gray"}
                    />
                  </button>




                  <button
                    onClick={() =>
                      editId === task._id
                        ? setEditId(null) || setEditTitle('') || setEditDescription('') || setEditStatus('')
                        : setEditId(task._id) || setEditTitle(task.title) || setEditDescription(task.description) || setEditStatus(task.status)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>




                  {/* This will show the select dropdown only when editId is set */}

                  {editId === task._id && (
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className=" block w-full border p-2 rounded-md focus:outline-none border-blue-400"
                    >
                      <option value="ToDo">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  )}









                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DashBoard;
