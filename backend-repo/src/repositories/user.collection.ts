import { db } from "../config/firebase.config";
import { User, UserUpdateData } from "shared-types";

const USERS_COLLECTION = "users";

// Function to calculate potential score
const calculatePotentialScore = (userData: UserUpdateData) => {
  const transformedRatings = String(
    Math.round((userData.totalAverageWeightRatings || 0) * 10)
  ).padStart(1, "0");

  const transformedRents = String(userData.numberOfRents || 0).padStart(4, "0");

  return parseFloat(
    `0.${transformedRatings}${transformedRents}${userData.recentlyActive || 0}`
  );
};

export const userRepository = {
  async updateUser(userId: string, updateData: UserUpdateData): Promise<void> {
    // Get current user data to calculate the new score
    const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();
    const userData = userDoc.data() || {};

    // Merge current data with update data
    const updatedData: UserUpdateData = {
      ...userData,
      ...updateData,
    };

    // Calculate the potential score
    const potentialScore = calculatePotentialScore(updatedData);

    // Add the score to the update
    await db
      .collection(USERS_COLLECTION)
      .doc(userId)
      .update({
        ...updateData,
        potentialScore,
        updatedAt: new Date().getTime() / 1000,
      });
  },

  // Function to recalculate scores for all users (run this periodically or after schema changes)
  async recalculateAllScores(): Promise<void> {
    const batch = db.batch();
    const snapshot = await db.collection(USERS_COLLECTION).get();

    snapshot.docs.forEach((doc) => {
      const userData = doc.data();
      const potentialScore = calculatePotentialScore(userData);
      batch.update(doc.ref, { potentialScore });
    });

    await batch.commit();
  },

  async findAllUsers(page: number, limit: number) {
    const skip = page * limit;

    // Now we can directly query using the pre-calculated field
    const [users, total] = await Promise.all([
      db
        .collection(USERS_COLLECTION)
        .orderBy("potentialScore", "desc") // Use the pre-calculated field
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
        .collection(USERS_COLLECTION)
        .count()
        .get()
        .then((snapshot) => snapshot.data().count),
    ]);

    return { users, total };
  },
};

