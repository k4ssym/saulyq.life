import express from "express";
import { 
    uploadHealthRecord, 
    getHealthRecords, 
    getDiseaseHistory,
    shareHealthRecord,
    generateCertificate
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/upload-health-record", upload.single('file'), uploadHealthRecord);
router.post("/get-health-records", getHealthRecords);
router.post("/get-disease-history", getDiseaseHistory);
router.post("/share-health-record", shareHealthRecord);
router.post("/generate-certificate", generateCertificate);

export default router;  