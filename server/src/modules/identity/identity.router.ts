import { Router } from "express";
import * as identityController from "./identity.controller";
const router = Router();

router.post("/register", identityController.registerUser);
router.post("/login", identityController.loginUser);
router.post("/email", identityController.checkEmailExists);
router.post("/username", identityController.checkUsernameExists);

export default router;
