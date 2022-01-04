// component to view 1 single citizen
import React from 'react';

import axios from 'axios';

class CitizenView extends React.Component {
    constructor(props) {
        super(props);
        let _id = window.location.href.split('=')[1]
        this.state = {
            id: _id,
            isLoaded: false
        }
        this.handleDelete = this.handleDelete.bind(this)

    }

    handleDelete(event){
        axios.delete(`/citizen/${this.state.id}`)
            .then(response=>{
                    // 
                    if(response){
                        window.location.href ='/'
                    }
            }).catch(err=>{
                // do something if error
            })
       
    }

    componentDidMount() {
        axios.get(`/citizen/${this.state.id}`)
            .then(response => { // make sure to use arrow functions if you want to use setState
                this.setState({
                    age: response.data.age,
                    name: response.data.name,
                    vaccinated: response.data.vaccinated,
                    profession: response.data.profession,
                    isLoaded: true
                })

            }).catch(err => {
            //in case something happens

        })
    }

    render() {
        if (!this.state.isLoaded) {
            //in case the citizen doesnt load
            return(
                <div>
                   Loading...
    
                </div>
            )
        } else{
            return(
                <div>
                    <h2>Age: {this.state.age}</h2>
                    <h2>Name: {this.state.name}</h2>
                    <h2>Vaccinated: {this.state.vaccinated===true? 'Yes' : 'No'}</h2>
                    <h2>Profession: {this.state.profession}</h2>
                    <button onClick={this.handleDelete}>Delete</button>
                </div>
            )
        }

    }
}

export default CitizenView;
