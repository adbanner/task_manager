import MenuBtn from "./buttons/MenuBtn"
import CreateBoardBtn from "./buttons/CreateBoardBtn"

export default function MainMenu(props) {
    return (
        <div className="grid gap-400">
            <p className="nav-title">ALL BOARDS <span>({props.boards.length})</span></p>

            <div className="nav-menu container grid">

                {
                    props.boards.map((el, id) =>
                        <MenuBtn key={id+el.name} name={el.name} id={id} />
                    )}

                <CreateBoardBtn />

            </div>
        </div>
    )
}