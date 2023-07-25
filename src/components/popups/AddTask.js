import { useEffect, useState } from "react"
import { useContext } from "react"
import { Context } from "../Context"
import EditItemsList from "../EditItemsList"
import ChangeTaskStatus from "../ChangeTaskStatus"
import HideAllPanels from "../utils/HideAllPanels"

export default function AddTask() {
    

    const { updateStage} = useContext(Context)
    const newItemName = "subtask";

    const { data } = useContext(Context)
    const { boardId } = useContext(Context)
    const { columnId } = useContext(Context)
    const columns = data.boards[boardId].columns

    const [status, setStatus] = useState(columns[0].name)
    const [newColumnId, setNewColumnId] = useState(0)

    let newStatus
    let index

    useEffect(()=>{
        setStatus(columns[0].name)
    },[boardId])
  
    // Change Task status
    const changeStatus = (e) => {
        let columns = data.boards[boardId].columns
        newStatus = e.target.dataset.statusMenuBtn
        setStatus(newStatus)

        // Find new column index to add a task
        setNewColumnId(columns.findIndex(el => el.name == newStatus))
    }
   
     // Add new task
     const addNewTask= () => {
        // Chech Errors
        const inputArr = Array.from(document.querySelector("[data-popup='add-task']").getElementsByClassName("input"))
        let error = false
        inputArr.forEach(input => {
            if (!input.value) {
                input.classList.add("error-border")
                error = true
            } else { input.classList.remove("error-border") }
        })
        if (error) return;

        //return;

        let newTaskName = document.querySelector("[data-popup='add-task']").querySelector("[data-title]").value
        let newTaskDescription = document.querySelector("[data-popup='add-task']").querySelector("[data-description]").value

        // Create New Task
        const newTask = {
            
            "title": `${newTaskName}`,
            "description": `${newTaskDescription}`,
            "status": `${status}`,
            "subtasks": []
          }

        // Add new item
        const newItemsList = document.querySelector("[data-popup='add-task']").querySelectorAll("[data-new-item='subtask']")

        newItemsList.forEach(el => {
            newTask.subtasks.push(
                {
                    "title": `${el.value}`,
                    "isCompleted": false
                }
              
            )
        })
        
        // Add Task to main Data
        data.boards[boardId].columns[newColumnId].tasks.unshift(newTask)
        updateStage()
        updateThis()
        HideAllPanels()
    }

    const updateThis = () => {
        document.querySelector("[data-popup='add-task']").querySelector("[data-title]").value = ''
        document.querySelector("[data-popup='add-task']").querySelector("[data-description]").value = ''
    }


    
    return (
        <div data-popup="add-task" className="new-task | popup hidden ">
            <div className="container grid gap-600">
                <p className="popup-title">Add New Task</p>

                {/* <!-- Title --> */}
                <div className="title-and-input">
                    <p>Title</p>
                    <textarea data-title
                        type="text" rows="1"
                        className="input"
                        maxLength="200"
                        placeholder="e.g. Take coffee break"></textarea>
                </div>

                {/* <!-- Description --> */}
                <div className="title-and-input">
                    <p>Description</p>
                    <textarea data-description type="text" rows="4" className="input" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries 
            a little."></textarea>
                </div>

                {/* <!-- Subtasks --> */}
                <div className="title-and-input">
                    <p>Subtasks</p>
                    <EditItemsList btnName={"+ Add New Subtask"} newItemName={newItemName}/>
                </div>

                {/* <!-- Status --> */}
                <div className="title-and-input">
                    <p className="clr-n1-to-n4">Status</p>
                   <ChangeTaskStatus name={"add-task"} columns={columns} status={status} changeStatus={changeStatus}/>
                </div>

                {/* <!-- Create task --> */}
                <button className="button btn1 btn" onClick={addNewTask}>Create task</button>
            </div>

        </div>
    )
}