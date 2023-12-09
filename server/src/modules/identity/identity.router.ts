import { Router } from "express";
import * as identityController from "./identity.controller";

import multer from "multer";
import { tokenValidator } from "../../middlewares/tokenValidator";

const router = Router();

const upload = multer();
router.post("/register", identityController.registerUser);
router.post("/login", identityController.loginUser);
router.post("/email", identityController.checkEmailExists);
router.post("/username", identityController.checkUsernameExists);
router.post(
  "/upload",
  upload.single("image"), // This is the 'key' in the formData
  tokenValidator,
  identityController.uploadProfilePicture
);

router.post("/bio", tokenValidator, identityController.updateUserBio);
export default router;
