import { useState, useEffect } from "react";

export default function ChangeTaskStatus(props) {
    const [name, setName] = useState(props.name)
    const dropdown = `[data-status-dropdown=${name}]`
    const menu = `[data-status-menu=${name}]`


    useEffect(() => {
        document.addEventListener("click", stageClick)
    }, [])


    const stageClick = (e) => {

        // Status buttons
        if (!e.target.closest(dropdown)) {
            document.querySelector(menu).style.display = "none";
        }
        if (e.target.matches(dropdown)) {
            document.querySelector(menu).style.display = "block";
        }
    }


    ////////
    return (
        <div className="grid">
            {/* Dropdown button*/}
            <button data-status-dropdown={name} className="dropdown btn">
                <span>{props.status}</span>
                <span className="icon-arrow-down bg-img"></span>
            </button>

            {/* Dropdown list */}
            <div data-status-menu={name} className="dropdown-div hidden">
                <div className="grid gap-200">
                    {props.columns.filter(el => el.name != props.status).map((column, id) =>
                        <button key={Math.random()} data-col={id}
                            data-status-menu-btn={column.name}
                            onClick={props.changeStatus}>{column.name}</button>
                    )}

                </div>
            </div>
        </div>

    )
}