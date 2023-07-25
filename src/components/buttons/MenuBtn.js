

export default function MenuBtn(props) {

    return (
        <button data-menu-btn={props.id} className={`menu-btn ${props.id==0 ? "active": ""} flex flex-start gap-300`}>
            <div className="menu-icon active-"></div>
            <p>{props.name}</p>
        </button>
    )
}