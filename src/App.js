import './App.css';
import Citizens from './components/Citizens';
import CitizenEdit from './components/CitizenEdit';
import CitizenView from './components/CitizenView';
import CitizenAdd from './components/CitizenAdd';
import Citizen from './components/Citizen';
import {
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div>
      {/* all your routs should be implemented here */}
      <Routes>
        <Route  path='/' element={<Citizens />} />
        <Route path='/editCitizen' element={<CitizenEdit />} />
        <Route path='/viewCitizen' element={<CitizenView />} />
        <Route path='/addCitizen' element={<CitizenAdd />} />
      </Routes>
    </div>
  );
}

export default App;
