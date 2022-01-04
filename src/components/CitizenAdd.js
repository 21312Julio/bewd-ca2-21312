// component to add a citizen

//we send an axios POST request inside this component so we need to import axios
import axios from 'axios';
//component has a state so we need to import react
import React from 'react';

class CitizenAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            age: '',
            name: '',
            profession: '',
            vaccinated: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

 

    handleInputChange(event){
        //will handle change when the form fileds are edited
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
        
      
    }

    handleSubmit(event) {
        // will handle the submission of the form
        // we need to send a POST request using axios to our server
        // See: https://github.com/axios/axios#request-method-aliases
        
        const params = new URLSearchParams()
        params.append('age', this.state.age);
        params.append('name', this.state.name);
        params.append('profession', this.state.profession);
        params.append('vaccinated', this.state.vaccinated)

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }


        axios.post("/citizen", params, config)
         
            .then((response)=>{
            //do something if this returns everything works fine, e.g. status 200 OK
            //we can send/reddirect the user to the main page
                window.location.href = '/'
            }).catch(()=>{
            // do something in case the server is not responding or something went wrong when submitting
            // e.g. you can clear the state
            // user will only be sent to the "/"(home) page if the request works
        })

        event.preventDefault();
    }

    render(){
        return(
            <div>
                
                {/* A HTML form for the user to insert a citizen */}
                {/* See details at: https://reactjs.org/docs/forms.html */}
                {/* for details on how to format the form tag check https://getbootstrap.com/ or https://react-bootstrap.github.io/ */}
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Age:
                    <input type="text" name="age" value={this.state.age} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Profession:
                    <input type="text" name="profession" value={this.state.profession} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Vaccinated:
                    <input 
                        type="checkbox" 
                        name="vaccinated" 
                        checked={this.state.vaccinated}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type="submit" value="Insert Citizen" />
                </form>
            </div>
        )
    }
}

export default CitizenAdd