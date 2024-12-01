import mongoose from 'mongoose';

import User from '@/lib/models/user.model';
import dbConnect from '@/lib/mongoose';
import { UserType } from '@/lib/type';

// Connect to the database
const connectToDB = async () => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
};

/**
 * Create a new user.
 * @param {Object} userData - The user data to create a new user.
 * @returns {Promise<Object>} - The created user.
 * @throws {Error} - If the user already exists or any other error occurs.
 */
export const createUser = async (userData: UserType) => {
  await connectToDB();
  const newUserData = await User.create(userData);
  const { password: _, ...userWithoutPassword } = newUserData.toObject();
  return userWithoutPassword;
};

// List all users
export const listUsers = async () => {
  await connectToDB();
  const users = await User.find();
  return users;
};

// Get a single user by ID
export const getUserById = async (userId: string) => {
  await connectToDB();
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Get a single user Email
export const getUserEmail = async (email: string) => {
  await connectToDB();
  const user = await User.findOne({ email });
  return user;
};

// Update a user by ID
export const updateUser = async (userId: string, updatedData: undefined) => {
  await connectToDB();
  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true, // Return the updated document
    runValidators: true, // Apply schema validation on update
  });
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};

// Delete a user by ID
export const deleteUser = async (userId: string) => {
  await connectToDB();
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error('User not found');
  }
  return deletedUser;
};

// Example usage functions
export const UserService = {
  createUser,
  listUsers,
  getUserById,
  getUserEmail,
  updateUser,
  deleteUser,
};

export default UserService;
