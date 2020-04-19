import { createStore, action, persist } from 'easy-peasy';
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
  cache: {
    stories: {},
    storyBodies: {},
    addStoryBodyToCache: action((state, storyBody) => {
      if (storyBody.id != null && state.storyBodies[storyBody.id] === undefined) {
        const copy = { ...state.storyBodies };
        copy[storyBody.id] = storyBody;
        state.storyBodies = copy;
      }
    }),
    addStoryToCache: action((state, story) => {
      if (story.id != null && state.stories[story.id] === undefined) {
        const copy = { ...state.stories };
        copy[story.id] = story;
        state.stories = copy;
      }
    }),
    addStoriesToCache: action((state, stories) => {
      const copy = { ...state.stories };
      stories.forEach((story) => {
        if (story.id != null && state.stories[story.id] === undefined) {
          copy[story.id] = story;
        }
      });
      state.stories = copy;
    }),
    clearCache: action((state) => {
      state.stories = {};
    }),
  },
};

const store = createStore<StoreModel>(persist(initStore));

export default store;
