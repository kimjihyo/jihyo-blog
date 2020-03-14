export default interface CommentEntry {
  id?: string;
  photoURL?: string | null;
  name: string;
  body: string;
  created: Date;
}
