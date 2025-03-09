import { Router } from "express";
import { updateUserData, fetchUsersData } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.put("/update-user-data", authMiddleware, updateUserData);
router.get("/fetch-user-data", authMiddleware, fetchUsersData);

export default router;
