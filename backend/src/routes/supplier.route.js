import {Router} from 'express'
import { fetchRequests } from '../controllers/supplier.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/fetch-request').post(verifyJWT,fetchRequests);
router.route('/fetch-request').get(verifyJWT,fetchRequests);
export default router; 