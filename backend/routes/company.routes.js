import express from 'express';
import {registerCompany, getCompanies, updateCompany, getCompanyById} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload} from "../middlewares/multer.js";

const router = express.Router();

router.post('/register', isAuthenticated, registerCompany);
router.get('/get', isAuthenticated,getCompanies);
router.get('/get/:id',isAuthenticated ,getCompanyById);
router.put('/update/:id', isAuthenticated, singleUpload ,updateCompany);

export default router;