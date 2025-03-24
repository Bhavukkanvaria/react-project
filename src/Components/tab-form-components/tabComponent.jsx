import { useState } from 'react'
import './style.css'
import { tabConfig } from './tab-config'

export const TabComponent = () => {

    const [data, setData] = useState({
        name: '',
        age: '',
        email: '',
        interests: [],
        settings: { theme: 'dark' }
    })

    const [activeTab, setActiveTab] = useState(0);
    const [errors, setErrors] = useState(null);

    const tabClick = (index) => {
        if(tabConfig[activeTab].validation(data, setErrors)){
            setActiveTab(index)
        }
    }

    const onNextTab = () => {
        if(tabConfig[activeTab].validation(data,setErrors)){
            if (activeTab != tabConfig.length - 1) {
                setActiveTab((prev)=> prev+1);
            }
        }
        
    }

    const onPrevTab = () => {
        if (tabConfig[activeTab].validation(data, setErrors)) {
            if (activeTab != 0) {
                setActiveTab((prev) => prev - 1);
            }
        }
    }

    const submitData = () => {
        if (tabConfig[activeTab].validation(data, setErrors)) {
            console.log('HIT API or Send data to the backend')
        }
    }

    const ActiveTab = tabConfig[activeTab].component;

    return (
        <div className=''>
            <h3>Step form</h3>
            <div className="tab-form-wrapper">
                <div className="tabs-wrapper">
                    {
                        tabConfig.map((tab, index) => {
                            return (
                                <div key={index} className={`tab-label ${index === activeTab ? 'active' : ''}`} onClick={() => tabClick(index)}>{tab.label}</div>
                            )
                        })
                    }
                </div>
                {
                    ActiveTab &&
                    <div className='tabs-content'>
                        <ActiveTab data={data} setData={setData} errors={errors}/>
                    </div>
                }
            </div>
            <div className='button-wrapper'>
                {
                    activeTab > 0 &&
                    <button className='button prev-button' onClick={onPrevTab}>Prev</button>
                }
                {
                    activeTab < tabConfig.length - 1 &&
                    <button className='button next-button' onClick={onNextTab}>Next</button>
                }
                {
                    activeTab === tabConfig.length - 1 &&
                    <button className='button submit-button' onClick={submitData}>Submit</button>
                }
            </div>
        </div>

    )
}