import React from 'react'

export default function ReturnData({ returnData }) {
    return (
        <div className="card" style={{ width: "18rem", marginTop: "100px", backgroundColor: "#431687" }}>
            <div className="card-body text-center text-light">
                <h5 className="card-title text-decoration-underline">{`Return Data (${returnData.source})`}</h5>

                <p className="card-text">{returnData.metadata}</p>

            </div>
        </div>
    )
}
