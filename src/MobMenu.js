
import MainMenu from "./components/MainMenu"
import ThemeToggler from "./components/ThemeToggler"


export default function MobMenu(props) {

    // Return ---------------------------------------------------------------
    return (
        <div className="mob-menu-div">
            <div data-mob-menu className="mob-menu">
                <div className="content">
                    <MainMenu {...props} />
                    <ThemeToggler />
                </div>
            </div>
        </div>
    )
}