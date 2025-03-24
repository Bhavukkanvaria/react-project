import { useState } from "react"
import './style.css'


const Modal = ({setShowModal})=>{

    const onClosehandle = ()=>{
        setShowModal(false)
    }

    return(
        <div id='modal' className="modal">
            <div className="content">
                <div className="header">
                    <span className="header-text">Header</span>
                    <span className="close-modal" onClick={onClosehandle}>X</span>
                </div>
                <div className="modal-body">
                    <h2>Body of Modal</h2>
                </div>
                <div className="footer">
                    <h3>Footer</h3>
                </div>
            </div>
        </div>
    )
}


const ModalPopup = () => {
    const [showModal, setShowModal] = useState(false)

    const handleClick = ()=>{
        setShowModal(!showModal)
    }

    return (
        <div className="modal-popup-wrapper">
            <button onClick={handleClick}>Open Modal</button>
            {
                showModal && <Modal setShowModal={setShowModal}/>
            }
        </div>
    )
}

export default ModalPopup;