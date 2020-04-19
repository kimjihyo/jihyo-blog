import UserSessionModel from './UserSessionModel';
import CacheModel from './CacheModel';

export default interface StoreModel {
  userSession: UserSessionModel;
  cache: CacheModel;
}
