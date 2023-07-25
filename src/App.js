import { useState, useEffect } from "react";
import { Context } from "./components/Context";

import Main from "./Main";
import jsonData from "./data.json";




function App() {

  const [dataMain, setDataMain] = useState(jsonData)
  //const [dataMain, setDataMain] = useState([])

  
  //const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || JSON.parse(jsonData))



  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data))
  // }, [update])



  return (
    <Context.Provider value={{dataMain, setDataMain}}>

      <Main {...dataMain} />
    </Context.Provider>
  );
}

export default App;
