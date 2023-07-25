
import { useEffect, useState } from "react"
import { useContext } from "react"
import { Context } from "../Context"


export default function TextWithCheckbox(props) {
    const [status, setChecked] = useState()
    const [title, setTitle] = useState()

    const { subtaskClick } = useContext(Context)

    const onCheck = () => {
        let st
        status ? st = false : st = true

        setChecked(st)
        setTitle(props.title)
        subtaskClick(props.id, st);
    }


    useEffect(() => {
        setChecked(props.isCompleted)
        setTitle(props.title)
    }, [props])
    return (
        <button className="checkbox-and-text btn gap-400" onClick={onCheck}>
            <input type="checkbox" defaultChecked={status} 
                                   onChange={onCheck} 
                                   name="checkbox" />

            <p className={status ? "checked": ""}>{title}</p>
        </button>
    )
}