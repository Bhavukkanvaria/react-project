import { useState } from "react"
import { tabData } from "./data"
import './style.css'

const Customtabs = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabClick = (index) => {
        setSelectedTab(index)
    }
    return (
        <div className="tab-wrapper">
            <div className="tab-item-wrapper">
                {
                    tabData.map((tabItem, index) => {
                        return (<div key={index}
                            className={`tab-item ${index === selectedTab ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}>
                            <span>{tabItem.label}</span>
                        </div>)
                    })
                }
            </div>
            <div className="tab-content">
                {
                    tabData[selectedTab]?.content
                }
            </div>
        </div>
    )

}

export default Customtabs