/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';


const getMe = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

const getAllUsers = async (
  keyword?: string,
  role?: string,
) => {
  const query: any = {};

  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
    query.email = { $regex: keyword, $options: "i" };
  }

  if (role) {
    query.role = role;
  }
  const result = await User.find(query);
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return result;
};


export const UserServices = {
  getMe,
  getAllUsers,
  deleteUser
};
