import { Router } from "express";
import * as identityController from "./identity.controller";

import multer from "multer";
import { sessionValidator } from "../../middlewares/sessionValidator";

const router = Router();

const upload = multer();
router.post("/register", identityController.registerUser);
router.post("/login", identityController.loginUser);
router.post("/email", identityController.checkEmailExists);
router.post("/username", identityController.checkUsernameExists);
router.post(
  "/upload",
  upload.single("image"),
  sessionValidator,
  identityController.uploadProfilePicture
);

router.post("/bio", sessionValidator, identityController.updateUserBio);
export default router;
