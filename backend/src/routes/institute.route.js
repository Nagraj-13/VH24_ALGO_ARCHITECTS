import {Router} from 'express'

import { verifyJWT } from '../middlewares/auth.middleware.js';
import { raiseRequest } from '../controllers/institute.controller.js';

const router = Router();

router.route('/raise-request').post(verifyJWT,raiseRequest);
export default router; 