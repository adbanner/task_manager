import { useState, useEffect } from "react"
import { useContext } from "react"
import { Context } from "../Context"
import EditItemsList from "../EditItemsList"
import HideAllPanels from "../utils/HideAllPanels"


export default function AddBoard() {
    const list = [{ "name": "" }]
    const [itemsList, setItemsList] = useState(list)
    const { data, updateStage, setCurrentBoard } = useContext(Context)
    const newItemName = "column";

    //____________________________________________
    const selectMenu = (id) => {
        document.querySelectorAll("[data-menu-btn].active").forEach(menu => {
            menu.classList.remove("active")
        })
        document.querySelector(`[data-menu-btn="${id}"]`).classList.toggle("active")
        setCurrentBoard(id)
    }
    //____________________________________________

    // Add new board ------------------------------------------
    const addNewBoard = () => {
        // Check Errors
        //
        //return;
        const inputArr = Array.from(document.querySelector("[data-popup='add-board']").getElementsByClassName("input"))
        let error = false
        inputArr.forEach(input => {

            if (!input.value) {
                input.classList.add("error-border")
                error = true
            } else { input.classList.remove("error-border") }
        })
        if (error) return;

        let newBoardName = document.querySelector("[data-popup='add-board']").querySelector("[data-name]").value
        // Create New Board
        const newBoard = {
            "name": `${newBoardName}`,
            "columns": []
        }


        // Add new columns
        const newItemsList = document.querySelector("[data-popup='add-board']").querySelectorAll("[data-new-item='column']")
        newItemsList.forEach(el => {
            newBoard.columns.push(
                {
                    "name": `${el.value}`,
                    "tasks": []
                }
            )
        })
        document.querySelector("[data-popup='add-board']").querySelector("[data-name]").value = ''
        // Add board to main Data
        setItemsList(list)
        data.boards.push(newBoard)
        updateStage()
        HideAllPanels()
        setTimeout(()=>selectMenu(data.boards.length - 1), 0)
    }



    //----------------------------------------------------------------------
    return (
        <div data-popup="add-board" className="new-task | popup hidden ">
            <div className="container grid gap-600">
                <p className="popup-title">Add New Board</p>

                {/* <!-- Title --> */}
                <div className="title-and-input">
                    <p>Board name</p>
                    <textarea data-name
                        type="text" rows="1"
                        className="input"
                        maxLength="20"
                        placeholder="e.g. Take coffee break"></textarea>
                </div>



                {/* <!-- Columns --> */}
                <div className="title-and-input">
                    <p>Board Columns</p>
                    <EditItemsList btnName={"+ Add New Column"} newItemName={newItemName} itemsList={itemsList} keyName={"name"}/>

                </div>

                {/* <!-- Create task --> */}
                <button data-add-board className="button btn1 btn " onClick={addNewBoard}>Create New Board</button>
            </div>

        </div>
    )
}