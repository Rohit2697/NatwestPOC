
import './App.css';
import HelpArticles from './HelpArticles/HelpArticles';
import GetSupport from './GetSupport/GetSupport'
import QuickLinks from './QuickLinks/QuickLinks'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Warning from './Warning/Warning';
import ReturnData from './ReturnData/ReturnData';
//import MobileLayout from './MobileLayout/MobileLayout';

function App() {
  //  const [showQuickLinks, setshowQuickLinks] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [deeplink, setDeepLink] = useState([])
  const [articles, setArticles] = useState([])
  const [support, setSupport] = useState([])
  const [warning, setWarning] = useState(true)
  const [returnData, setReturnData] = useState({
    source: "",
    metadata: 'No data'
  })
  //const searchInput = useRef('')
  const [device, setDevice] = useState('')
  const selectValue = (e) => {

    setDevice(e.target.value)
  }
  const onInputChange = (e) => {
    setSearchInput((prev) => e.target.value)
    console.log(searchInput)
  }

  const fetchData = async (input) => {
    const resultObj = await axios.get(`http://localhost:8081/search?query=${input}`)
    //console.log(resultObj)
    return resultObj
  }

  useEffect(() => {

    setSearchInput(searchInput)
    //console.log(searchInput)
    fetchData(searchInput).then(result => result.data).then(data => {
      if (data) {
        console.log(data)
        setDeepLink(data.deeplink)
        setArticles(data.articles)
        setSupport(data.support)
      }
    })


  }, [searchInput])

  useEffect(() => {
    //  console.log(device)
    if (!device || device === 'Device') {
      console.log("first")
      setWarning(true)
    }
    else {
      setWarning(false)
    }
  }, [device, setWarning])
  //console.log(warning)
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <ReturnData returnData={returnData} />
        </div>
        <div className='col-9'>
          <div className='shadow-lg p-0 mb-5 bg-body rounded' style={{ width: "300px", margin: "auto", marginTop: "10px" }}>
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
                  <input type="text" value={searchInput} onChange={onInputChange} className="form-control text-light" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1" style={{ backgroundColor: "#2a1052", border: "none" }} />

                </div>

              </div>

            </div>
            <div className='container  my-1' style={{ height: "460px", backgroundColor: "#dee1e3" }}>
              {
                warning ? <div className='row fs-6 text-center my-1'>
                  <Warning />
                </div> : ""
                
              }
              {
                !warning && support.length ? <div className='row fs-6 text-start my-1'>
                  <GetSupport support={support} setReturnData={setReturnData} searchInput={searchInput} />
                </div> : ""
              }
              {!warning && deeplink.length ? <div className='row fs-6 text-start my-1'>


                <QuickLinks device={device} deeplink={deeplink} setReturnData={setReturnData} />
              </div> : ""}
              {!warning && articles.length ? <div className='row fs-6 text-start'>
                <HelpArticles articles={articles} setReturnData={setReturnData} />
              </div> : ""}

            </div>
          </div>
        </div>
      </div>
    </div>
    // <MobileLayout showQuickLinks={showQuickLinks} setshowQuickLinks={setshowQuickLinks}

    //   device={device} setDevice={setDevice}
    //   selectValue={selectValue}
    // />

  );
}

export default App;
