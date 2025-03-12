import { Router } from "express";
import {
  updateUserData,
  fetchUsersData,
  recalculatePotentialScore,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.put("/update-user-data/:id", authMiddleware, updateUserData);
router.get("/fetch-user-data", authMiddleware, fetchUsersData);
router.get(
  "/recalculate-potential-score",
  authMiddleware,
  recalculatePotentialScore
);

export default router;

