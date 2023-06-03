import {createContext} from 'react';
 
const ThemeContext = createContext({getTheUser: () => {}, user:{name:'', email:'', picture:''}});
 
export default ThemeContext;