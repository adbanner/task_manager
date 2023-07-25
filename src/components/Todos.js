import Todo from "./Todo"

export default function Todos(props) {
    
    const colors = ["73,196,229", "8471F2", "103,226,174", "36,170,49", "18,18,118"]
    const board = props.boards[props.boardId]
    return (

        <section data-todos className="todos hidden-">
            <div className="columns gap-600 ">

                {/* Todos columns */}
                { board.name ? board.columns.map((col, col_id) =>

                    <div key={col_id} className="todo-column gap-500" 
                         style={{animationDelay: (0.1*col_id)+"s"}}>
                        
                        <div className="todo-header flex flex-start gap-300">
                            <div className="todo-icon" style={{ backgroundColor: `rgb(${colors[col_id]})` }}></div>

                            <p>{col.name}<span>({col.tasks.filter(elm => elm).length})</span></p>
                        </div>

                        {/* Todos*/}
                        <div className="container grid gap-500">

                            {col.tasks.map((task, task_id) =>
                                <Todo key={col_id+"_"+task_id} col_id={col_id} task_id={task_id} {...task} />
                            )}

                        </div>

                    </div>
                ) : ""}

                {/* + New column */}
                <div className="todo-column gap-500">
                    <div className="todo-header flex flex-start gap-300"><li style={{opacity: 0}}></li>
                    </div>
                    
                    <button data-popup-btn="edit-board" className="add-column todo">+ New Column</button>


                </div>






            </div>
        </section>
    )
}