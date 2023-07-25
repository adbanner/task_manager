import { useEffect, useState } from "react"
import { useContext } from "react"
import { Context } from "../Context"
import TextWithCheckbox from "../buttons/TextWithCheckbox"
import ChangeTaskStatus from "../ChangeTaskStatus"

export default function EditTask() {

    const { data, boardId, columnId, taskId, setColumnId, setTaskId, taskData, updateStage} = useContext(Context)
    const [status, setStatus] = useState(taskData.status)
    
    const [root, setRoot] = useState(document.querySelector("[data-popup='view-task']"))
    const done = taskData.subtasks.filter(el => el.isCompleted).length
    const total = taskData.subtasks.length
    const columns = data.boards[boardId].columns

    useEffect(() => {
       
        setStatus(taskData.status)
    }, [taskData])

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


    return (
        <div data-popup="view-task" className="edit-task | popup hidden ">
            <div className="container grid gap-600">
                <div className="title-and-menu ">
                    <p className="popup-title">{taskData.title}</p>

                    <div>
                        <button data-task-menu className="nav-mob btn"></button>

                        {/* Task menu */}
                        <div data-task-menu-dropdown className="absolute">
                            <div className="dropdown-div grid gap-200">
                                <button data-popup-btn="edit-task">Edit</button>
                                <button data-popup-btn="delete-task" className="error">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <p className="description" >{taskData.description}</p>

                {/* <!-- Subtasks --> */}
                <div className="title-and-input" style={{ display: taskData.subtasks.length ? "grid" : 'none' }}>
                    <p className="clr-n1-to-n4">Subtasks ({done} of {total})</p>

                    <div className="grid gap-300">
                        {
                            taskData.subtasks.map((sub, id) =>
                                <TextWithCheckbox key={id} id={id} {...sub} />
                            )
                        }
                    </div>
                </div>

                {/* <!-- Status --> */}
                <div className="title-and-input">
                    <p className="clr-n1-to-n4">Status</p>
                    <ChangeTaskStatus name={"view-task"} columns={columns} status={status} changeStatus={changeStatus} root={"[data-popup='view-task']"}/>
                </div>


            </div>

        </div>
    )
}