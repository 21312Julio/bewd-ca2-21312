//component to view all citizens

import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Citizen from './Citizen';

class Citizens extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          citizens: [],
          isLoaded: true
        }

    }

 

    componentDidMount(){

        axios.get('/citizen')
            .then((response) => {

            // handle success when status is 200 and OK
            // populate the citizens array with the data from the server
            // set isLoaded to true to make sure we render the right values on screen
                this.setState( {
                    citizens: response.data,
                    isLoaded: true
                })
                
            })
            .catch((error)=> {
            // handle error 
            // in case we get an error from the server, e.g. the server is offline
                console.log(error);
                this.setState({
                    isLoaded:false,
                    error
                })
                
            })
       
           
    }


    render(){
        //assign variables using the state
        const { isLoaded, error, citizens} = this.state;
        
        //conditional rendering: https://reactjs.org/docs/conditional-rendering.html
        //if we are waiting for our server to serve us the data render this part of code
        // also render this if the SERVER is offline
        if(!isLoaded){
            return(
                <div>The page is loading or the SERVER is down...</div>
            )
        //render this part of code if we received the data from the server
        } else {
            return(
                <div>
                    <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Age</th>
                            <th>Name</th>
                            <th>Vaccinated</th>
                            <th>Profession</th>
                        </tr>
                    </thead>

                    <tbody>
                        {citizens.map(d => {
                            return <Citizen key={d._id} citizen={d} />
                        })}
                    </tbody> 
                    </table>
              </div>  
            )
        }
    }
}
    

export default Citizens;
