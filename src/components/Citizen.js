import {Link, useNavigate} from 'react-router-dom';
import CitizenView from './CitizenView'
const Citizen = (props) => {

    let navigate = useNavigate();
    console.log(props);
    let citizen  = props.citizen;
    return(
        <tr >
            <td>{citizen._id}</td>
            <td>{citizen.age}</td>
            <td >{citizen.name}</td>
            <td >{citizen.profession}</td>
            {/* https://reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator */}
            <td >{citizen.vaccinated? 'Yes' : 'No'}</td>
            {/* For links see: https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-links */}
            { }
            <td><Link to={"/viewCitizen?id="+citizen._id}>View </Link></td>
            <td><Link to={`/editCitizen?id=${citizen._id}`} >Edit </Link></td>
            
        </tr>
    )
}

export default Citizen;