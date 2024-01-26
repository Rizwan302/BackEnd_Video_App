import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState([]);


  useEffect(()=>{
    axios.get("/api/user").then((response)=>{
      setData(response.data)
      console.log(response)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])

  return (
    <>
      <h1>Show Book Case</h1>
      <p>book Length: {data.length}</p>
      {data.map((item)=>(
        <div>
          <h1>{item.title}</h1>
          <p>{item.dec? item.dec : "Not Dec"}</p>
        </div>
      ))}
    </>
  )
}

export default App
