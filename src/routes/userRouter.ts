import {Router} from 'express'
import { createUser, signIn } from '../handlers/user'

const router = Router()

router.post('/register', createUser)

router.post('/signin', signIn)

export default router