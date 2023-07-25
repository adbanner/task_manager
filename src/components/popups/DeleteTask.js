import { useContext, useEffect } from "react"
import { Context } from "../Context"
import HideAllPanels from "../utils/HideAllPanels"


export default function DeleteTask() {

    const { data, boardId, columnId, taskId, setUpdate, setDataMain } = useContext(Context)

    const deleteTask = () => {
        const newData = data.boards[boardId].columns[columnId].tasks.filter((el, id) => id != taskId)
        data.boards[boardId].columns[columnId].tasks=newData
        
        HideAllPanels()
        setUpdate(Math.random())
       
    }


    return (
        <div data-popup="delete-task" className="delete-task | popup hidden ">
            <div className="container grid gap-600">
                <p className="popup-title clr-error">Delete this Task?</p>

                {/* <!-- Title --> */}
                <p className="description">Are you sure you want to delete the ‘Platform Launch’ board? This action will
                    remove all columns and tasks and cannot be reversed.</p>

                <div className="row-to-col grid gap-400">
                    <button className="btn-delete button  btn" onClick={deleteTask}>Delete</button>
                    <button className="button btn" onClick={HideAllPanels}>Cancel</button>
                </div>
            </div>
        </div>

    )
}