
import AddBoard from "./AddBoard"
import AddTask from "./AddTask"
import ViewTask from "./ViewTask"
import DeleteBoard from "./DeleteBoard"
import DeleteTask from "./DeleteTask"
import EditTask from "./EditTask"
import EditBoard from "./EditBoard"


export default function Popups(props) {
    return (
        <div data-popups className="hidden border-">
            <div data-out className="popups grid border-">
                <div className="popups-container grid border-">
                    {/* Boards */}
                    <AddBoard />

                   { props.boards ?
                   <>
                        <EditBoard />
                        <DeleteBoard />

                        {/* Tasks */}
                        <AddTask />
                        <ViewTask />
                        <EditTask />
                        <DeleteTask />
                    </>
                    : ""
                }
                </div>
            </div>
        </div>
    )
}