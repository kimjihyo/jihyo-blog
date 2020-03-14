import { Action } from 'easy-peasy';
import UserModel from './UserModel';

export default interface UserSessionModel {
  user: UserModel;
  setUser: Action<UserSessionModel, UserModel>;
  clearUserSession: Action<UserSessionModel, void>;
}
