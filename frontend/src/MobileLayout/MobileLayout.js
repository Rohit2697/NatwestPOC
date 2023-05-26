import React from 'react'
import HelpArticles from '../HelpArticles/HelpArticles'
import GetSupport from '../GetSupport/GetSupport'
import QuickLinks from '../QuickLinks/QuickLinks'

export default function MobileLayout({ showQuickLinks, setshowQuickLinks, device, selectValue }) {

    return (
        <div className='shadow-lg p-0 mb-5 bg-body rounded' style={{ width: "300px", margin: "auto", marginTop: "15px" }}>
            <div style={{ height: "150px", backgroundColor: "#431687" }}>
                <div style={{ width: "100px", margin: "auto", paddingTop: "11px" }}>
                    <select onChange={selectValue} className="form-select form-select-sm text-light" aria-label=".form-select-sm example" style={{ backgroundColor: "#2a1052", textAlign: "center", border: "none" }}>
                        <option defaultValue={`Device`}>Device</option>
                        <option value="ios">Apple</option>
                        <option value="android">Android</option>
                    </select>
                </div>

                <div className='d-flex justify-content-around p-5'>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control text-light" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1" style={{ backgroundColor: "#2a1052", border: "none" }} />

                    </div>

                </div>

            </div>
            <div className='container  my-1' style={{ height: "400px", backgroundColor: "#dee1e3" }}>
                <div className='row fs-6 text-start my-1'>
                    <GetSupport />
                </div>
                {showQuickLinks && <div className='row fs-6 text-start my-1'>
                    <QuickLinks setshowQuickLinks={setshowQuickLinks} device={device} />
                </div>}
                <div className='row fs-6 text-start'>
                    <HelpArticles />
                </div>

            </div>
        </div>
    )
}
