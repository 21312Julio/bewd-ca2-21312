//component to edit a citizen entry

//we have state so we need to import react
import React from 'react';

//we need to send a PUT request and a GET request so we need axios
import axios from 'axios';


class CitizenEdit extends React.Component{
    constructor(props){
        super(props);
        // I get the id by spliting the link in an array where it finds the "=" sign
        // the array will contain the two values, one before the =, one after; the second value will be the id
        // there are other ways extract the id from the link, if you do find a different one, you are free to use it
        let _id = window.location.href.split('=')[1]
        this.state = {
            id : _id,
            age : '',
            name : '',
            profession: '',
            vaccinated : ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //use componentDidMount to populate the sate with the values from the server
    // could also use componentWillMount()
    componentDidMount(){
        // make sure to not use arrow functions, otherwise this.setState will not point to the state of the component
        axios.get(`/citizen/${this.state.id}`)
            .then((response) =>{
                // we will handle the response similar to the Citizens Component
                // yet we will assign each value in particular
                this.setState({
                    age : response.data.age,
                    name : response.data.name,
                    profession: response.data.profession,
                    vaccinated: response.data.vaccinated
                })
            }).catch(err=>{
                //if there is an error you should let the user know here
                console.log(err);
            })
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
      // See for x-www-form-urlencoded https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b
        
        const params = new URLSearchParams()
        params.append('age', this.state.age);
        params.append('name', this.state.name);
        params.append('profession', this.state.breed);
        params.append('vaccinated', this.state.isNeutred)

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }

        // will handle the submission of the form
        // we need to send a POST request using axios to our server
        // See: https://github.com/axios/axios#request-method-aliases
        // a put request is very similar to a post request, we just add the id in the link
        // make sure to use back ticks ``
        axios.put(`/citizen/${this.state.id}`, params, config)
            //all variables and vales from the state should go here
            // you should probablly check to see if the values are not empty or  have malicious intent

            
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
        // we should have conditional rendering here and check if our state is set right before rendering the table
        return(
            <div>
                {/* A HTML FORM to edit the Citizen  (very similar to your CitizenAdd component)*/}
                {/* values should be loeaded in the state of your component using axios */}
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
                    <input type="submit" value="Edit Citizen" />
                </form>
            </div>
        )
    }
}

export default CitizenEdit;
