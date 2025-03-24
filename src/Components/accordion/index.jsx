import { useState } from "react"
import data from "./data";
import './style.css'


const Accordion = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [multiSelectedIds, setMultiSelectedIds] = useState([])
    const [enablemulti,setEnableMulti] = useState(false);

    const handleSingleSelection = (_event, item) => {
        if (!enablemulti) {
            let id = item.id === selectedId ? null : item.id;
            setSelectedId(id)
        } else {
            let ids = [];
            if(multiSelectedIds.includes(item.id)){
                ids = multiSelectedIds.filter((id)=> id!=item.id)
            }else{
                ids = [...multiSelectedIds,item.id]
            }
            setMultiSelectedIds(ids)
        }
    }

    const onMultiClickEnable = () => {
        setEnableMulti(!enablemulti);
        setSelectedId(null)
        setMultiSelectedIds([])
    }

    return (<div className="accordion-wrapper">
        <h3>Accordion</h3>
        <div className={enablemulti ? "enable-multi active":"enable-multi"} onClick={onMultiClickEnable}>{enablemulti ?"Disbale" : "Enable"} Multi Selection</div>
        <div className="accordion">
        {
            <ul>
                {
                    data.map((item) => {
                        return (<li className="item" key={item.id} onClick={(event) => handleSingleSelection(event, item)}>
                            <div className="title">
                                <h3>{item.question}</h3>
                                <span>
                                    { (multiSelectedIds.includes(item.id))  || (selectedId === item.id)  ? '-': '+'}
                                </span>
                            </div>
                            {
                                !enablemulti &&
                                selectedId===item.id ? <div className="answer">{item.answer}</div>:null
                            }
                            {
                                enablemulti && 
                                multiSelectedIds.includes(item.id) ? <div className="answer">{item.answer}</div>:null
                            }
                        </li>)
                    })
                }
            </ul>
        }
        </div>
    </div>)
}

export default Accordion