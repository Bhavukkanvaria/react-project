import { useState } from "react";
import {menus as data} from "./data";
import {FaMinus, FaPlus} from 'react-icons/fa'
import './style.css';


const RenderList = ({data})=>{

    return(
        <ul className="item-wrapper">
            {data && data.map((item,index)=>{
                return (<RenderItem key={index} item={item}/>)
            })}
        </ul>
    )
}

const RenderItem = ({ item }) => {

    const [showChildren,setShowChildren] = useState({})

    const handleToggle = (label) => {
        setShowChildren({
            ...showChildren,
            [label]: !showChildren[label]
        })
    }

    return (
        <li className="list-item">
            <div style={{ display: 'flex', gap: '20px' }}>
                <div>{item.label}</div>
                {
                    item && item.children?.length ? <span onClick={() => handleToggle(item.label)} style={{cursor:'pointer'}}>
                        {showChildren[item.label] ? <FaMinus size={16}/> : <FaPlus size={16}/>}
                        </span> : null
                }
            </div>
            {
                item.children && showChildren[item.label] ?
                    (<RenderList data={item.children} />)
                    : null
            }
        </li>
    )
}


const TreeView = () => {
    return (
        <div className="tree-wrapper">
            <RenderList data={data} />
        </div>
    )
}

export default TreeView