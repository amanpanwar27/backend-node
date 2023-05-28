import express from 'express';
import { userLogin, getUser } from '../controllers/Authentication/auth';
import authentication from '../middleware/authentication';

const router = express.Router();
// router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/getUser',authentication,getUser)
// router.post('/logout', logout)
// router.post('/refresh', refresh)

export default router
