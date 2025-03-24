import React from 'react';
import { useContext } from "react";
import { FeatureFlagsContext, FeatureFlagsProvider } from "./useContext";
import Accordion from "../accordion"
import RandomColor from "../random-color"
import Customtabs from "../tab-components"
import TicTacToe from "../Tic-tac-toe"

export const allfeaturesData = [
    {
        key: "showTicTacToeBoard",
        component: <TicTacToe />,
    },
    {
        key: "showRandomColorGenerator",
        component: <RandomColor />,
    },
    {
        key: "showAccordian",
        component: <Accordion />,
    },
    {
        key: 'showTabs',
        component: <Customtabs />
    }
]

const FeatureFlagsCompnents = () => {
    const { loading, featureFlagsData, setFeatureFlagsData } = useContext(FeatureFlagsContext);

    const checkFeature = (currentKey) => {
        return featureFlagsData[currentKey]
    }

    const onhandleClick = (feature) => {
        if (feature in featureFlagsData) {
            setFeatureFlagsData({ ...featureFlagsData, [feature]: !featureFlagsData[feature] })
        }
    }

    if (loading) return (<div>Loading....</div>);
    return (
        < div className="feature-flag-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems:'center' }}>
            <h3>Feature Flag</h3>
            <button style={{ width: '200px', fontSize: '12px' }} onClick={() => { onhandleClick('showRandomColorGenerator') }}>
                {featureFlagsData['showRandomColorGenerator']
                    ? 'Disbale Random Color Generator' :
                    'Enable Random Color Generator'}
            </button>
            {
                allfeaturesData.map((feature) => {
                    return checkFeature(feature.key) ? <React.Fragment key={feature.key}>{feature.component}</React.Fragment> : null
                })
            }
        </div>
    )
}


const FeatureFlags = () => {
    return (
        <FeatureFlagsProvider>
            <FeatureFlagsCompnents />
        </FeatureFlagsProvider>
    )
}

export default FeatureFlags