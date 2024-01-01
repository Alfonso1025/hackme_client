import React, {useEffect, useState} from 'react'
import './Dashboard.css'




const Dashboard= (props) => {

const remoteServer = process.env.REACT_APP_REMOTE_SERVER
const localServer = process.env.REACT_APP_LOCAL_SERVER
//recibe props
const userId = props.userId
const userName = props.userName

// local state
const [movies, setMovies] = useState([])
const [errorMessage, setErrorMessage] = useState('')
const [isFetchError, setIsFetchError] = useState(false)

async function getMovies(){
        try {
           const response = await fetch(`http://hackme.alfonso-softtech.com/app1/movies`) 
           console.log('this is the response: ',response)
           const parseResponse = await response.json()

           if(parseResponse.code !== 200){
            setErrorMessage('There was an error retrieving the movies')
            setIsFetchError(true)
            return
           }
           setMovies(parseResponse.data)
           console.log(parseResponse)
           return 
          
        } 
        catch (err) {
          console.log(err)
          setIsFetchError(true)
          setErrorMessage('error retrieving movies')
        }
    }
useEffect(()=>{
    getMovies()
},[])

return (
        <div className='dashboard-wrapper'>
           <h1>Hello {userName} </h1>
        
        {
            movies.map((movie, index) => (
        <div key={index}>
           
            <p>{movie.title}</p>
            
        </div>
    ))
        }

           
        {
            isFetchError &&
            <div>
                <p>{errorMessage}</p>
            </div>
        }
            
        </div>
    )
}
export default Dashboard