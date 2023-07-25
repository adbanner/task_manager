import { useState, useEffect } from "react"
import InputWithX from "./InputWithX"
import { useContext } from "react"
import { Context } from "./Context"


// Input : Object
// Output : Object


export default function EditItemsList(props) {
    const { data } = useContext(Context)
    const [, setRnd] = useState()
    const [btnName, setBtnName] = useState(props.btnName || "+ Add New Column")


    const keyName = props.keyName || "name"
    const newList = [{ [keyName]: "" }]
    const [itemsList, setItemsList] = useState(props.itemsList? JSON.parse(JSON.stringify(props.itemsList)) : newList)


    // On list update
    useEffect(() => {
        if (props.itemsList) { 
            setItemsList(JSON.parse(JSON.stringify(props.itemsList))) 
        }
        
    }, [props.itemsList])


    // Add Item
    const addItem = () => {
        if (itemsList.length >= 10) return;
        itemsList.push({ [keyName]: "" })
        //console.log(itemsList)
        setRnd(Math.random())
    }

    // Remove Item
    const removeItem = item_id => {
        if (itemsList.length <= 1) return;
        setItemsList(itemsList.filter((item, id) => id != item_id))

    }
    // On item Change
    const onItemNameChange = (id, item_name) => {
        itemsList[id][keyName] = item_name
    }

    return (
        <div data-edit-items className="grid gap-300">
            {itemsList.map((item, id) =>
                <InputWithX key={id + Math.random()} id={id} {...item}
                    removeItem={removeItem}
                    newItemName={props.newItemName}
                    onItemNameChange={onItemNameChange}
                />
            )
            }


            <button className="button btn add-btn" onClick={addItem}>{btnName}</button>
        </div>

    )
}