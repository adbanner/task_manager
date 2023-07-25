
import MainMenu from "./MainMenu"
import ThemeToggler from "./ThemeToggler"
import SidebarToggler from "./SidebarToggler"

import BtnsClickEvents from "../components/BtnsClickEvents"

export default function Navigation(props) {

  BtnsClickEvents()


  // Return ---------------------------------------------------------------
  return (
    <div data-navigation className="navigation grid gap-500 hidden-">

     <MainMenu {...props}/>


      <div className="align-bottom grid gap-200">
        <ThemeToggler />
        <SidebarToggler />
      </div>
    </div>
  )
}