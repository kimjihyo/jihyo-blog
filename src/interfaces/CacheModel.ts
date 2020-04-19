import { Action } from 'easy-peasy';
import StoryEntry from './StoryEntry';
import StoryBody from './StoryBody';


export default interface CacheModel {
  stories: {[key: string]: StoryEntry};
  storyBodies: {[key: string]: StoryBody};
  addStoryBodyToCache: Action<CacheModel, StoryBody>;
  addStoryToCache: Action<CacheModel, StoryEntry>;
  addStoriesToCache: Action<CacheModel, StoryEntry[]>;
  clearCache: Action<CacheModel, void>;
}
