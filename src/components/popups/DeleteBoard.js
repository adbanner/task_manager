import { useContext, useEffect } from "react"
import { Context } from "../Context"
import HideAllPanels from "../utils/HideAllPanels"

export default function DeleteBoard() {

    const { data, setData, boardId, setCurrentBoard, setDataMain, dataMain} = useContext(Context)
    const deleteBoard = () => {
        const newData = data.boards.filter((el) => el.name != data.boards[boardId].name)
        setDataMain({ "boards": newData })
        setCurrentBoard(0)
        HideAllPanels()

    }

    return (
        <div data-popup="delete-board" className="delete-task | popup hidden ">
            <div className="container grid gap-600">
                <p className="popup-title clr-error">Delete this board?</p>

                {/* <!-- Title --> */}
                <p className="description">Are you sure you want to delete the ‘Platform Launch’ board? This action will
                    remove all columns and tasks and cannot be reversed.</p>

                <div className="row-to-col grid gap-400">
                    <button data-delete-bord className="btn-delete button  btn" onClick={deleteBoard}>Delete</button>
                    <button className="button btn" onClick={HideAllPanels}>Cancel</button>
                </div>
            </div>
        </div>

    )
}