import axios from 'axios'

const serverUrl = process.env.NODE_ENV === 'production' ? 'https://toro-plate.herokuapp.com/api' : `http://localhost:8000/api`
console.log(serverUrl)
const createHeaders = () => {
    return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
}


const actions = {

    getUser: async () => {
        return await axios.get(`${serverUrl}/get-the-user`, createHeaders())
    },

    addPost: async (post:any) => {
        let res = await axios.post(`${serverUrl}/add-post`, post, createHeaders())
        return res
    },
    getAllPosts: async (post:any) => {
        return await axios.get(`${serverUrl}/all-the-posts`, createHeaders())
    },

    authenticate: async (profileObj:any) => {
        let res = await axios.post(`${serverUrl}/authenticate`, profileObj, createHeaders())
        localStorage.setItem('token', res.data.token)
        return res
    }
}

export default actions