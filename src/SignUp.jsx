import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'






const SignUp = (props) => {

const navigate = useNavigate();
const remoteServer = process.env.REACT_APP_REMOTE_SERVER
const localServer = process.env.REACT_APP_LOCAL_SERVER

//recibe props



//local state
const [userName, setUserName]=useState('')
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const [errorMessage, setErrorMessage] = useState('missing credentials')
const [isSignUpFailed, setIsSignUpFailed] = useState(false)
const [isSignUpSuccessful, setIsSignUpSuccesfull] = useState(false)


//function definitions
const validateInputs = (userName, email, password)  => {
       
    if(userName == '' || email == '' || password == ''){
        setErrorMessage('missing a required field')
        return false
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setErrorMessage('invalid input format')
        return false
    }
    if(password.length > 10){
        setErrorMessage('password cant be longer than 10 characters')
        return false
    }
    return true
}

const submitUserToServer = async (e) => {
  e.preventDefault()
  try {
    if(!validateInputs(userName, email, password)) {
        //show the error message for 2 seconds, then come back to display sign up form
           console.log('aha')
          setIsSignUpFailed(true)
           setTimeout(()=>{setIsSignUpFailed(false)}, 2000)
           return
           
    }
    const body= {userName,email,password}
    const response = await fetch(`http://hackme.alfonso-softtech.com/app1/signup`,{
           method:'POST',
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(body)
    })
    console.log(response)
    const newUser= await response.json()
    console.log('this is new user: ',newUser)
    //unsuccesful signup
    if(newUser.code !== 200){
        console.log('something failed on sign up')
        if(newUser.code === 400){
            if(newUser.message === 'missing_credentials')setErrorMessage('email and password are required fields')
            else if(newUser.message === 'invalid_email') setErrorMessage('invalid_email_format')
        }
        else if(newUser.code === 409){
            if(newUser.message === 'existing_user') setErrorMessage('already have an account. Log in')
        
        }
        setUserName('')
        setEmail('')
        setPassword('')
        setIsSignUpFailed(true)
        setTimeout(()=>{setIsSignUpFailed(false)}, 2000)
        
        return 
    }
    //succesful signup
    console.log('succesful sign up')
    setIsSignUpSuccesfull(true)
    setTimeout(()=>{navigate('/login')}, 3000)
    
}
 catch (error) {
    if(error instanceof Error){
        console.log('this is the error',error)
        
     }
}   
 
}


const goToLogin = ()=>{
    navigate('/login');
}


    return (

        <> 
       
       <div className='login-wrapper'>
           
           <form className='form-login' onSubmit={submitUserToServer}>
            <input type="text"
                placeholder="name"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                className= 'input-signin'
             />
            <input type="email"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className= 'input-signin'
             />
              <input type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className= 'input-signin'
             />
             <input type="submit" value="sign up" className='button-signin'/>
           </form>
           {isSignUpFailed && 
             <div><p>{errorMessage}</p></div>
           }
           {
            isSignUpSuccessful &&
            <div><p>Your account was created!</p></div>
           }
           <div className='goTo-container'>
                <div className='goTo-item'> 
                    <p className='goTo-p'> Already have an account?</p>
                    <button className='goTo-button'onClick={goToLogin}>Sign up</button>
                </div>
                
                
            </div>
       </div>
      </>
    )
}

export default SignUp