import { useState, useEffect } from "react"
import { useContext } from "react"
import { Context } from "../Context"
import EditItemsList from "../EditItemsList"
import HideAllPanels from "../utils/HideAllPanels"


export default function EditBoard() {

    let root = document.querySelector("[data-popup='edit-board']")

    const [itemsList, setItemsList] = useState()
    const { data, boardId, updateStage } = useContext(Context)
    const newItemName = "column";

    const [boardName, setBoardName] = useState("")

    useEffect(() => {
        root = document.querySelector("[data-popup='edit-board']")
        root.querySelector("[data-name]").value = data.boards[boardId].name
        
        setBoardName(data.boards[boardId].name)
        setItemsList(data.boards[boardId].columns)
       
        updateStage(Math.random())
    }, [boardId])


    // Save board
    const saveBoard = () => {
       const boardObj = data.boards[boardId]
        boardObj.name = root.querySelector("[data-name]").value

       // Get all column inputs
       const newItemsList = root.querySelectorAll("[data-new-item]")
        let newColumns = []

       // Create new column object
       console.log(boardObj)
        newItemsList.forEach((el, id) => {
            const column = boardObj.columns.find(col => col.name == el.defaultValue)
            console.log(el.defaultValue)
            if (el.value) {
                if (column) {
                    
                    //column.name = el.value
                    newColumns.push(column)
                   // console.log(column)
                } else {
                    newColumns.push(
                        {
                            "name": `${el.value}`,
                            "tasks": []
                        }
                    )
                }

                // Add column 


            }
        })
        //Save new list of columns
        boardObj.columns = newColumns
        updateStage(Math.random())
        HideAllPanels()
    }

    //----------------------------------------------------------------------
    return (
        <div data-popup="edit-board" className="new-task | popup hidden ">
            <div className="container grid gap-600">
                <p className="popup-title">Edit Board</p>

                {/* <!-- Title --> */}
                <div className="title-and-input">
                    <p>Board name</p>
                    <textarea data-name
                        type="text" rows="1"
                        className="input"
                        maxLength="20"
                        placeholder="e.g. Take coffee break"
                        defaultValue={boardName}></textarea>
                </div>



                {/* <!-- Columns --> */}
                <div className="title-and-input">
                    <p>Board Columns</p>

                    <EditItemsList btnName={"+ Add New Column"} newItemName={newItemName} itemsList={itemsList} keyName={"name"} />

                </div>

                {/* <!-- Create task --> */}
                <button className="button btn1 btn" onClick={saveBoard}>Save Board</button>
            </div>

        </div>
    )
}