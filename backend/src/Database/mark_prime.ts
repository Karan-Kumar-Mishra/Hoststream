import { UserModel } from "./model";

export default async function mark_prime(user_id:string) {
    try {
        // Validate user_id
        if (!user_id || typeof user_id !== 'string') {
            throw new Error('Invalid user_id');
        }

        // Update the document using _id
        const result = await UserModel.updateOne(
            { id: user_id }, // Use _id instead of id
            { $set: { is_prime: true } } // Simplified field name (no quotes needed)
        );

        // Check if any document was updated
        if (result.matchedCount === 0) {
            throw new Error('User not found');
        }

        if (result.modifiedCount === 0) {
            console.warn('User already marked as prime or no changes made');
        }

        return { success: true, message: 'User marked as prime successfully' };
    } catch (error) {
        console.error('Error in mark_prime:', error);
        throw error;
    }
}