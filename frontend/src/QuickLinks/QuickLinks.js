import React, { } from 'react'
//import deeplink from './deeplink.json'
export default function QuickLinks({ device, deeplink, setReturnData }) {

    // console.log(device)
    const openDeeplink = (e, text) => {
        e.preventDefault()
        setReturnData({
            source: "QuickLinks",
            metadata: text
        })
        // console.log(`from Deeplink ${text}`)
    }
    const getQuickLink = (deeplink) => {
        // console.log(deeplink)
        let deeplinkArr = deeplink.filter((link) => link._source[device] === 'Y')
        // console.log(deeplinkArr)
        return deeplinkArr
    }

    // console.log(deeplinkArr)
    return (
        <div className='container' >
            <p className='text-sm-start' style={{ margin: "0", fontWeight: "700" }}>Quick Links</p>
            {
                getQuickLink(deeplink).length ? getQuickLink(deeplink).map((link, index) => {
                    return (<div className='row bg-light' key={`deeplink_${index}`
                    }>
                        <div onClick={(e) => openDeeplink(e, link._source.code)} className="col list-group-item list-group-item-action">{link._source.feature}</div>
                    </div>)
                })
                    : <div className='row bg-light' key={`deeplink_NotSupported`
                    }>
                        <div className="col list-group-item text-danger list-group-item-action">{`No Deeplink for ${device}`}</div>
                    </div>}

        </ div>
    )
}
