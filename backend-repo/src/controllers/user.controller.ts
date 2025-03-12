import { Response } from "express";
import { UserUpdateData } from "shared-types";
import { AuthRequest } from "../middleware/auth.middleware";
import { userRepository } from "../repositories/user.collection";

export const updateUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const updateData: UserUpdateData = req.body;
    await userRepository.updateUser(req.params?.id, updateData);

    return res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchUsersData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 5;

    const { users, total } = await userRepository.findAllUsers(page, limit);

    return res.status(200).json({
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const recalculatePotentialScore = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    // Recalculate potential score for all data
    await userRepository.recalculateAllScores();

    return res.status(200).json({
      message: "Potential score recalculated successfully",
    });
  } catch (error) {
    console.error("Error recalculating potential score:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

