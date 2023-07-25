
export default function Header(props) {
    if(!props.boards) return
    const name = props.boards[props.boardId].name

    return (
        <div className="header | flex flex-start gap-300">
            <div data-logo-div className="logo-div | flex flex-start gap-300">
                <div className="logo"></div>
                <span className="logo-name">Taskana</span>
            </div>

            <button data-dropdown="menu" className="empty-button flex fs-700">
                <span className="board-name h1">{name}</span>
                <div className="arrow-down mob"></div>
            </button>

            <div className="add-and-dots flex gap-100">
                <button data-add-task data-popup-btn="add-task" className="add-task-btn btn mob-"> <span>+ Add New Task </span></button>



                <div>
                    <button data-board-menu className="nav-mob btn"></button>

                    {/* Board menu */}
                    <div data-board-menu-dropdown className="absolute hidden">
                        <div className="dropdown-div grid gap-200">
                            <button data-popup-btn="edit-board">Edit Board</button>
                            <button data-popup-btn="delete-board" className="error">Delete Board</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
