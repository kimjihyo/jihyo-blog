import { createStore, action } from 'easy-peasy';
import StoreModel from '../interfaces/StoreModel';
import UserModel from '../interfaces/UserModel';

const initUser: UserModel = {
  uid: '',
};

const initStore: StoreModel = {
  userSession: {
    user: initUser,
    setUser: action((state, user) => {
      state.user = user;
    }),
    clearUserSession: action((state) => {
      state.user = initUser;
    }),
  },
};

const store = createStore<StoreModel>(initStore);

export default store;
