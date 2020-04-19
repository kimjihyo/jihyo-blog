export default interface StoryEntry {
  id?: string;
  title: string;
  body: string;
  created: number;
  isLocked?: boolean;
  category?: string;
  hidden?: boolean;
}
