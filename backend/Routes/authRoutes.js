

import express from 'express';
import { getCurrentUser, login, logout, signup } from '../controller/auth.controller.js';
import { ensureAuthenticated } from '../middleware/Auth.js';
const router=express.Router()

router.post('/signup', signup )
router.post('/login', login);
router.get('/logout', logout)
router.get('/currentuser',ensureAuthenticated, getCurrentUser)

export default router;