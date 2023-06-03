import {useState, useEffect, useContext} from 'react';
import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Profile from './components/Profile';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NoMatch from './components/NoMatch';
import { GoogleLogin } from '@react-oauth/google';
import actions from "./api/index";
import TheContext from './TheContext';
import { IUser } from './Interfaces';

function App() {

  let [user, setUser] = useState<IUser>({name:'', email:'', picture: ''})

  const getTheUser = async () => {
    let res = await actions.getUser().catch(console.error)
    if(res){
      setUser(res.data)
    }    
  }
  const logOut = () => {
    localStorage.removeItem('token')
    setUser({name:'', email:'', picture: ''})
  }

  useEffect(() => {
    getTheUser()
  }, [])



  return (  
    <TheContext.Provider value={{getTheUser, user}}>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} logOut={logOut}/>}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      </TheContext.Provider>

  );
}



function Layout(props:any) {  
  let { getTheUser } = useContext(TheContext)

  return (
    <>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
          <h4>Welcome {props.user.name}</h4>
          <hr />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>        
          {props.user.name ?
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li> 
            <Link onClick={props.logOut} to="">LogOut</Link>
            </li>   
            </>  
           :
           <li>
            <GoogleLogin
              onSuccess={async credentialResponse => {
                await actions.authenticate(credentialResponse)
                await getTheUser()
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              auto_select
            />
            </li>
          }

       
        </ul>
        
      </nav>
      
      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
      </>

  );
}



export default App;
