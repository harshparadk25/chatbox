import express from 'express'
import isLogin from '../middleware/isLogin.js'
import { getCurrentChatter, getUserBySearch } from '../routeControlers/userhandlerController.js'
const router = express.Router()

router.get('/search',isLogin,getUserBySearch);

router.get('/currentChatter',isLogin,getCurrentChatter)

export default router;