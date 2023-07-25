import { useEffect, useState } from "react"

export default function InputWithX(props) {
    //console.log(props[Object.keys(props)[1]])
    const onItemChange = (e) => {
       props.onItemNameChange(props.id ,e.target.value )
    }
    return (
        <div  className="input-and-x">
            <textarea type="text" rows="1" 
                      className="input" 
                      placeholder="e.g. Make coffee" 
                      defaultValue={props[Object.keys(props)[1]]}
                       onChange={onItemChange} 
                      data-new-item={props.newItemName}
                      ></textarea>

            <button className="x-btn btn border-" onClick={()=> props.removeItem(props.id)}></button>
        </div>
    )
}