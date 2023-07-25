
export default function SidebarToggler() {
    return (
        <div className="sidebar-toggler-div grid">
            <button data-hide-sidebar className="menu-btn | hide-menu ">
                <div className="flex flex-start gap-300">
                    <div className="menu-icon"></div>
                    <p>Hide Sidebar</p>
                </div>
            </button>
            <div className="open-sidebar">
                <button data-open-sidebar className=""></button>
            </div>
        </div>
    )
}