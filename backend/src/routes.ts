import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { IUserJWT } from './Interfaces';

const router = Router()
const Post = require('./Models/Post')
const User = require('./Models/User')

router.get('/', (req:Request, res:Response) => {
    res.json({ serverWorking: true })
})

router.get('/get-the-user', authorize, async (req:Request, res:Response) => {
    let user = await User.findById(res.locals.user._id)
    res.json(user)
})

router.post('/add-post', authorize, async (req:Request, res:Response) => {
    let newPost = req.body
    newPost.userId = res.locals.user._id
    Post.create(newPost).then((post:any) => {
        res.json(post)
    })
})

router.get('/all-the-posts', (req:Request, res:Response) => {
    Post.find().populate('userId').then((posts:any) => {
        res.json(posts)
    })
})

router.post('/authenticate', async (req:Request, res:Response) => {    
    const userJwt:IUserJWT = jwt_decode(req.body.credential);
    const { sub, email, name, picture  } = userJwt

    let user = await User.findOne({ sub, email })    
    if (!user) {
        user = await User.create({ sub, email, name, picture  })
    }

    jwt.sign({ user }, 'secret key', { expiresIn: '30min' }, (err, token) => {
        res.json({ user, token })
    })
})




//Middle ware >>> Put this in the middle of any route where you want to authorize
function authorize(req:Request, res:Response, next:any) {
    let token = req.headers.authorization && req.headers.authorization.split(' ')[1] //Token from front end 
    if (token) {
        jwt.verify(token, 'secret key', (err:any, data:any) => {
            if (!err) {
                res.locals.user = data.user //Set global variable with user data in the backend 
                next()
				return
            } else {
                return res.status(403).json({ message: err })				
            }
        })
    } else {
        return res.status(403).json({ message: "Must be logged in!" })
    }
}



module.exports = router