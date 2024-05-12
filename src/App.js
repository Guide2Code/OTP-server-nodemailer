import './App.css';
import {useState} from "react";
import axios from "axios";
function App() {
  const [otp,setOtp] = useState();
  const [email,setEmail] = useState();

  const verify = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:6800/verify',{otp,email}).then(res=>(console.log(res)));
      console.log(res);
    } catch (error) {
      console.log("Something went wrong")
      console.log(error)
    }
  }
  return (
    <div className="App">
     <form onSubmit={verify}>
      <input type='number' onChange={(e)=>setOtp(e.target.value)} placeholder='otp'/>
      <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
      <input type='submit'/>
     </form>
    </div>
  );
}

export default App;


