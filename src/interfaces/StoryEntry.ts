export default interface StoryEntry {
  id?: string;
  title: string;
  body: string;
  created?: Date;
  isLocked?: boolean;
  category?: string;
}
