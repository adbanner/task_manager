import { useEffect, useState } from "react"
import { useContext } from "react"
import { Context } from "../Context"
import EditItemsList from "../EditItemsList"
import ChangeTaskStatus from "../ChangeTaskStatus"
import HideAllPanels from "../utils/HideAllPanels"

export default function EditTask() {


    const { data, boardId, columnId, taskId, setColumnId, setTaskId, taskData, updateStage } = useContext(Context)
    const [status, setStatus] = useState(taskData.status)

    const columns = data.boards[boardId].columns

    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")
    const [itemsList, setItemsList] = useState()

    const newItemName = "subtask";
    const root = document.querySelector("[data-popup='edit-task']")



    useEffect(() => {
        document.querySelector("[data-popup-btn='edit-task']").addEventListener("click", onEditTaskClick)
    }, [])

    const onEditTaskClick = () => {
       

        let root = document.querySelector("[data-popup='edit-task']")
        const taskObj = data.boards[localStorage.getItem("boardId")]
            .columns[localStorage.getItem("columnId")]
            .tasks[localStorage.getItem("taskId")]
            console.log("taskObj", data.boards[localStorage.getItem("boardId")]
            .columns[localStorage.getItem("columnId")])
        if (!taskObj) return;
        setTaskName(taskObj.title)
        setDescription(taskObj.description)
        setItemsList(taskObj.subtasks)
        setStatus(taskObj.status)
        root.querySelector("[data-title]").value = taskObj.title
        
    }


    const changeStatus = (e) => {
        //console.log(e.target.innerHTML)
        let columns = data.boards[boardId].columns
        let newStatus = e.target.dataset.statusMenuBtn
        setStatus(newStatus)

        // Find a new column index to add a task
        const index = columns.findIndex(el => el.name == newStatus)

        // Move task to new column
        const taskObj = data.boards[boardId].columns[columnId].tasks[taskId]
        taskObj.status = newStatus

        columns[index].tasks.unshift(taskObj)

        // Set new column index and id for current task
        setColumnId(index)
        setTaskId(0)
        localStorage.setItem("columnId", index)
        localStorage.setItem("taskId", 0)
        // Delete task from current column
        delete columns[columnId].tasks[taskId]

        updateStage()

    }

    // Save task
    const saveTask = () => {
        const taskObj = data.boards[boardId].columns[columnId].tasks[taskId]
        taskObj.title = root.querySelector("[data-title]").value
        taskObj.description = root.querySelector("[data-description]").value


        // Get all subtask inputs
        const newItemsList = root.querySelectorAll("[data-new-item]")
        let newSubtasks = []

        // Create new subtask object
        newItemsList.forEach(el => {
            const subtask = taskObj.subtasks.find(sub => sub.title == el.defaultValue)
            let isCompleted
            if (subtask == undefined) {
                 isCompleted = false 
                } else { 
                    isCompleted = subtask.isCompleted 
                }
            
            // Add subtask 
            if (el.value) {
                newSubtasks.push(
                    {
                        "title": `${el.value}`,
                        "isCompleted": isCompleted
                    }
                )
            }
        })
        // Save new list of subtasks
        taskObj.subtasks = newSubtasks
        updateStage(Math.random())
        HideAllPanels()
    }


    // Update 
    const updateThis = () => {
        root.querySelector("[data-title]").value = ''
        root.querySelector("[data-description]").value = ''
    }



    return (
        <div data-popup="edit-task" className="new-task | popup hidden ">
            <div className="container grid gap-600">
                <p className="popup-title">Edit Task</p>

                {/* <!-- Title --> */}
                <div className="title-and-input">
                    <p>Title</p>
                    <textarea data-title
                        type="text" rows="1"
                        className="input"
                        maxLength="200"
                        placeholder="e.g. Take coffee break"
                        defaultValue={taskName}></textarea>
                </div>

                {/* <!-- Description --> */}
                <div className="title-and-input">
                    <p>Description</p>
                    <textarea data-description type="text" rows="4"
                        className="input"
                        placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries 
            a little."
                        defaultValue={description}
                    ></textarea>
                </div>

                {/* <!-- Subtasks --> */}
                <div className="title-and-input">
                    <p>Subtasks</p>
                    <EditItemsList btnName={"+ Add New Subtask"} newItemName={newItemName} itemsList={itemsList} keyName={"title"} />
                </div>

                {/* <!-- Status --> */}
                <div className="title-and-input">
                    <p className="clr-n1-to-n4">Status</p>
                    <ChangeTaskStatus name={"edit-task"} columns={columns} status={status} changeStatus={changeStatus} root={"[data-popup='edit-task']"} />

                </div>


                {/* <!-- Save task --> */}
                <button className="button btn1 btn" onClick={saveTask}>Save task</button>
            </div>

        </div>
    )
}