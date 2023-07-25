import { useState, useEffect, useContext} from "react";

import { Context } from "./components/Context";

import Popups from "./components/popups/Popups";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Todos from "./components/Todos";
import MobMenu from "./MobMenu";



function Main(props) {

  const { dataMain, setDataMain } = useContext(Context)
  const [data, setData] = useState(props)

  //const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || JSON.parse(jsonData))
  const [boardId, setBoardId] = useState(0)
  const [taskId, setTaskId] = useState(0)
  const [columnId, setColumnId] = useState(0)
  const [board, setBoard] = useState(data.boards[boardId])
  const [taskData, setTaskData] = useState(data.boards[boardId].columns[columnId].tasks[taskId])
  const [update, setUpdate] = useState()


  useEffect(() => {
    setData(props)
  }, [props])

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data))
  }, [update])


  // Set current board ID
  const setCurrentBoard = (id) => {
    localStorage.setItem("boardId", id)
    localStorage.setItem("columnId", 0)
    setBoardId(id)
    setColumnId(0)
    setBoard(data.boards[id])
    //console.log(data.boards)
  }




  // On Task Click
  const taskClick = (col_id, task_id) => {
    localStorage.setItem("columnId", col_id)
    localStorage.setItem("taskId", task_id)

    setBoard(data.boards[boardId])
    setColumnId(col_id)
    setTaskId(task_id)
    setTaskData(data.boards[boardId].columns[col_id].tasks[task_id])
  }


  const subtaskClick = (id, isCompleted) => {
    data.boards[boardId].columns[columnId].tasks[taskId].subtasks[id].isCompleted = isCompleted
    setUpdate(Math.random())
  }

  const updateStage = () => {
    setUpdate(Math.random())
    //console.log("update")
  }


  // useEffect(() => {
  //   console.log("data been changed")
  // }, [data, taskId, columnId])


  return (
    <Context.Provider value={{ dataMain, setDataMain, setUpdate, setCurrentBoard, data, setData, boardId, columnId, taskId, taskData, taskClick, subtaskClick, updateStage, setColumnId, setTaskId }}>
      <div className="App">

        <Popups {...data} />
        <MobMenu {...data}/>

        <div data-fader className="fader hidden"></div>
        <Header {...data} boardId={boardId} />
        <main className="main">

          <Navigation {...data} />

          {props.boards ?
            <Todos key={board.name} boardId={boardId} {...data} /> : ""}

        </main>
      </div>
    </Context.Provider>
  );
}

export default Main;
