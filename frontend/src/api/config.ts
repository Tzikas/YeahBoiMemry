
let baseURL: any = ''; 
if( process.env.NODE_ENV === 'production' ) {
  if(process.env.REACT_APP_API){ 
    baseURL = `${process.env.REACT_APP_API}/api` //Netlify 
  } else {
    baseURL = `/api` //Heroku or 5000 
  }
} else {
  baseURL = `http://localhost:8000/api` 
}

export default baseURL