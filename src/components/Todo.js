
import { useContext } from "react"
import { Context } from "./Context"


export default function Todo(props) {
    const done = props.subtasks.filter(el => el.isCompleted).length
    const total = props.subtasks.length

    const progress = done/total*100
    const { taskClick } = useContext(Context)

    const clickHandler = ()=>{
        taskClick (props.col_id, props.task_id)
    }

    return (
        <div data-popup-btn="view-task" onClick={clickHandler} className="todo grid gap-100">
            <span>{props.title}</span>
            <p>{done} of {total} substask{total>1 ? "s" :""}</p>
            <div className="progress-bar">
                <div data-task-progress style={{width: progress+"%"}}></div>
            </div>
        </div>
    )
}