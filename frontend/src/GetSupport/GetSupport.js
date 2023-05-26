import React from 'react'
//import support from './output.json'
export default function GetSupport({ support, searchInput, setReturnData }) {
    // const returnSearchResult = (support) => {
    //     return support.length > 1 ? support.slice(0, 2) : support
    // }
    const openSupport = (e, textArr) => {
        e.preventDefault()
        const text = textArr.find(text => text.match(searchInput))
        setReturnData({
            source: "Get Support"
            , metadata: text || textArr[0]
        })
    }
    return (
        <div className='container'>
            <p className='text-sm-start' style={{ margin: "0", fontWeight: "700" }}>Get support</p>

            {support.map((element, index) => {
                return (
                    < div className='row bg-light' key={`support_${index}`}>
                        <button onClick={(e) => openSupport(e, element._source.intent)} className="col list-group-item list-group-item-action text-decoration-underline">{element._source.description}</button>
                    </div>
                )
            })}


        </div >
    )
}
