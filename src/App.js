import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './Pages/ProfilePage';
function App() {
  return (
    <>
     <ToastContainer />
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
    </Router></>
  );
}

export default App;

