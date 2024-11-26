import { Router } from "express";
import { create, get } from "../controllers/dms/dms.controller.js";
import { upload } from "../config/multer.config.js";
import auth from "../middleware/auth.middleware.js";

const router = Router()

router.use(auth)

router.get('/', (req, res) => {
    res.send('AT DMS is working')
})
router.post('/', upload.single('doc'), create)
router.get('/:referenceNo', get)

export default router