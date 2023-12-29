import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'



const Login= (props)=>{
const remoteServer = process.env.REACT_APP_REMOTE_SERVER
const localServer = process.env.REACT_APP_LOCAL_SERVER
const navigate = useNavigate();

// recibe props
const setIsAuthenticated = props.setIsAuthenticated
const setUserId = props.setUserId
const setUserName = props.setUserName


//store user input info into state variables
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errorMessage, setErrorMessage] = useState('missing credentials')
const [isLoginFailed, setIsLoginFailed] = useState(false)

//function definitions
const validateInputs = (uEmail, uPassword) =>{
   
    if(uEmail == '' || password == ''){
        setErrorMessage('missing a required field')
        return false
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(uEmail)){
        setErrorMessage('invalid input format')
        return false
    }
    if(password.length > 10){
        setErrorMessage('password cant be longer than 10 characters')
        return false
    }
    return true
}
const submitLoginForm = async(e)=>{

   e.preventDefault()
  //unsuccesfull login
  if(!validateInputs(email, password)) {
     setIsLoginFailed(true)
     setTimeout(()=>{setIsLoginFailed(false)}, 2000)
     return 
   }   
   try {
       const body = {email, password}
       const response = await  fetch(`${remoteServer}/login`,{
           method:'POST',
           headers:{'content-type':'application/json'},
           body: JSON.stringify(body)
        })
        const loggedUser = await response.json()
        console.log(loggedUser)
        //unsuccesful login
        if(loggedUser.code != 200){
            if(loggedUser.code === 400){
                if(loggedUser.message === 'missing_credentials')setErrorMessage('email and password are required fields')
                else if(loggedUser.message === 'invalid_email') setErrorMessage('invalid_email_format')
            }
            else if(loggedUser.code === 401){
                if(loggedUser.message ==='user_not_found') setErrorMessage('The email is incorrect')
                else if(loggedUser.message === 'incorrect_password') setErrorMessage('the password is incorrect')
                
            }
            setEmail('')
            setPassword('')
            setIsLoginFailed(true)
            setTimeout(()=>{setIsLoginFailed(false)}, 2000)
            
            return loggedUser
        }
        //successful login

        console.log('sucessful login')
        console.log(loggedUser)
        setUserId(loggedUser.data.id)
        setUserName(loggedUser.data.userName)
        setIsAuthenticated(true)
        navigate('/dashboard')

  
   } 
   catch (error) {
    console.log(error)
   }
}

const goToSignUp = ()=>{
    navigate('/signUp');
}


    return (
        <>
            
            <div className='login-wrapper'>
            
            <form className="form-login" onSubmit={submitLoginForm}>
                <input type="email"
                  placeholder="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  className="input-signin"/>
                  
                <input 
                type="password" 
                 placeholder="password"
                 value={password}
                 onChange={e=>setPassword(e.target.value)}
                 className="input-signin"/>
                <button className="button-signin">Sign in</button>
            </form> 
            {isLoginFailed && 
             <div><p>{errorMessage}</p></div>
           }
           
            <div className='goTo-container'>
                <div className='goTo-item'> 
                    <p className='goTo-p'>Dont have an account?</p>
                    <button className='goTo-button'onClick={goToSignUp}>Sign up</button>
                </div>
                
                
            </div>
        </div>
        </>
        
            
        
    )
}
export default Login