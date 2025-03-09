import { db } from "../config/firebase.config";
import { UserUpdateData } from "../entities/user.interface";

const USERS_COLLECTION = "users";

export const userRepository = {
  async updateUser(userId: string, updateData: UserUpdateData): Promise<void> {
    await db
      .collection(USERS_COLLECTION)
      .doc(userId)
      .update({
        ...updateData,
        updatedAt: new Date().toISOString(),
      });
  },
  async findAllUsers(page: number, limit: number) {
    const skip = page * limit;

    const [users, total] = await Promise.all([
      db
        .collection("users")
        .orderBy("createdAt", "desc")
        .offset(skip)
        .limit(limit)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        ),
      db
        .collection("users")
        .get()
        .then((snapshot) => snapshot.size),
    ]);

    return { users, total };
  },
};
