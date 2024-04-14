import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom"



export default function Login(){

    const navigate=useNavigate();

    const [userCred,setUserCred]=useState({
        email:"",
        password:""
    })
     const [message,setMessage]=useState({
        type:"invisible-msg",
        text:""
    })

    function handleInput(event){
        setUserCred((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value}
        })
    }

    function handleSubmit(event){
        event.preventDefault();

        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(userCred),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>{
            // setUserCred({
            //     email:"",
            //     password:""
            // })
            if(res.status===404){
                setMessage({type:"error",text:"UserName or Email Doesn't exist"})
            }
            else if(res.status===403){
                setMessage({type:"error",text:"Incorrect Password"})
            }
          
             
            
            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"dummy"})
            },5000)
            return res.json()
        }
        )
        .then((data)=>{
            // console.log(data.token)
            
            if(data.token!==undefined){

                localStorage.setItem("nutrify-user",JSON.stringify(data))
    
                navigate("/track")
            }
            
            

        })
        .catch((err)=>{
            console.log(err);
        })
        console.log(userCred)
    }

    return(
        <section className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login to your fitness journey</h1>
                
                <input className="inp" required type="email" onChange={handleInput} 
                placeholder="Enter your email" name="email" value={userCred.email}/>
                <input className="inp" required type="password" onChange={handleInput} 
                placeholder="Enter your password" name="password" value={userCred.password}/>
               

                <button className="btn">Login</button>
                <p>Not Registerd ? <Link to={"/register"}>Create a new Account</Link></p>
                <p className={message.type}>{message.text}</p>

            </form>
        </section>
    )
}