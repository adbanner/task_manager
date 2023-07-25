import { useContext, useEffect } from "react"
import { Context } from "../components/Context"
import { useState } from "react"


export default function BtnClickEvents() {
  const { data, setData, setUpdate, boardId, taskId, setCurrentBoard } = useContext(Context)
  let sidebarIsOpen = true

  // Select menu
  const selectMenu = (id) => {
    document.querySelectorAll("[data-menu-btn].active").forEach(menu => {
      menu.classList.remove("active")
    })
    //Set active
    document.querySelectorAll(`[data-menu-btn="${id}"]`).forEach(menu => {
      menu.classList.toggle("active")
    })
    setCurrentBoard(id)
  }


  // Hide all panels
  const hideAll = () => {
    document.querySelectorAll("[data-popup]").forEach(popup => {
      popup.style.display = "none";
    })
    $("[data-popups]").style.display = "none";
    $("[data-fader]").style.display = "none";
  }

  
  //
  useEffect(() => {
    selectMenu(boardId)
  }, [boardId])



  //Stage click
  useEffect(() => {
    document.addEventListener("click", stageClick)
  }, [])

  // Click handler
  const stageClick = (e) => {
    // Menu
    if (e.target.matches("[data-menu-btn]")) {
      selectMenu(e.target.dataset.menuBtn)
    }

    // Side Panel -------------------------------------------------------------------

    // Open
    if (e.target.matches("[data-open-sidebar]")) {
      sidebarIsOpen = true
      $("[data-navigation]").style.transform = "translateX(0)";
      $("[data-todos]").style.paddingLeft = "calc(var(--sidebar-width) + var(--size-600))";
      $("[data-logo-div]").style.width = "var(--sidebar-width)";

      $("[data-open-sidebar]").style.transform = "translateX(-100%)"
    }
    // Close
    if (e.target.matches("[data-hide-sidebar]")) {
      sidebarIsOpen = false
      $("[data-navigation]").style.transform = "translateX(-100%)"
      $("[data-todos]").style.paddingLeft = "var(--size-600)"
      $("[data-logo-div]").style.width = "calc(var(--sidebar-width) - 60px)";

      $("[data-open-sidebar]").style.transform = "translateX(0)"
    }


    //Dropdown menu
    if(e.target.matches("[data-dropdown='menu']")){
      $("[data-mob-menu]").classList.toggle("active")
    }else{
     $("[data-mob-menu]").classList.remove("active")
    }
    //console.log(e.target)
    if (e.target.matches("[data-out]")) {
      hideAll()
    }



    // Popup buttons-------------------------------------------------------------------
    if (e.target.matches("[data-popup-btn]")) {
      $("[data-fader]").style.display = "block";
      $("[data-popups]").style.display = "block";
      $(`[data-popup=${e.target.dataset.popupBtn}]`).style.display = "block";
    }

    // Task menu
    if (e.target.matches("[data-task-menu]")) {
      $("[data-task-menu-dropdown]").style.display = "block";
    } else {
      $("[data-task-menu-dropdown]").style.display = "none";
    }

    //Dropdown | Delete btn
    if (e.target.matches("[data-popup-btn='delete-task']")) {
      $("[data-popup='view-task']").style.display = "none";
    }

    //Dropdown | Delete Board
    if (e.target.matches("[data-board-menu]")) {
      $("[data-board-menu-dropdown]").style.display = "block";
    } else {
      $("[data-board-menu-dropdown]").style.display = "none";
    }



  }
  //console.log(e.target.matches())
  function $(name) {
    return document.querySelector(name)
  }
  //console.log($("data-popup"))




  // Window resize events=========================================================
  window.addEventListener("resize", onResize);
  let device

  function onResize() {
    var style = getComputedStyle(document.querySelector(':root'));
    device = style.getPropertyValue("--device").toString();


    // Mobile
    if (device == "mob") {
      $("[data-todos]").style.paddingLeft = "var(--size-600)"
      $("[data-logo-div]").style.width = "50px";

    }
    else if (device == "tablet") {
      if (sidebarIsOpen) {
        $("[data-navigation]").style.transform = "translateX(0)";
        $("[data-todos]").style.paddingLeft = "calc(var(--sidebar-width) + var(--size-600))";
        $("[data-logo-div]").style.width = "var(--sidebar-width)";

        $("[data-open-sidebar]").style.transform = "translateX(-100%)"
      } else {
        $("[data-navigation]").style.transform = "translateX(-100%)"
        $("[data-todos]").style.paddingLeft = "var(--size-600)"
        $("[data-logo-div]").style.width = "calc(var(--sidebar-width) - 60px)";

        $("[data-open-sidebar]").style.transform = "translateX(0)"

      }
    }

  }


  return (
    <></>
  )


}