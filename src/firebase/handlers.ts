import firebaseApp from './config';
import 'firebase/firestore';
import StoryEntry from '../interfaces/StoryEntry';
import CommentEntry from '../interfaces/CommentEntry';

const getStories = (
  onSuccess: (stories: StoryEntry[]) => void,
) => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .orderBy('created', 'desc')
    .limit(30)
    .get()
    .then((snapshot) => {
      const stories: StoryEntry[] = [];
      snapshot.forEach((document) => {
        const data = document.data();

        const date = new Date(0);
        date.setUTCSeconds(data.created.seconds);
        stories.push({
          id: document.id,
          title: data.title,
          body: data.body,
          created: date,
          category: data.category,
          hidden: data.hidden,
        });
      });
      onSuccess(stories);
    });
};

const getStoryIds = (onSuccess: (ids: string[]) => void) => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .orderBy('created', 'desc')
    .get()
    .then((snapshot) => {
      const ids: string[] = [];
      snapshot.forEach((document) => {
        ids.push(document.id);
      });
      onSuccess(ids);
    });
};

const getStory = (
  storyID: string,
  onSuccess: (story: StoryEntry) => void,
  onFailure?: () => void,
) => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .doc(storyID)
    .get()
    .then((document) => {
      const data = document.data();
      if (data) {
        const date = new Date(0);
        date.setUTCSeconds(data.created.seconds);
        // Now we need to get a story body
        store
          .collection('storyBodies')
          .doc(data.body)
          .get()
          .then((r) => {
            const bodyData = r.data();
            if (bodyData) {
              onSuccess({
                id: document.id,
                title: data.title,
                created: date,
                isLocked: data.isLocked,
                body: bodyData.body,
                category: data.category,
              });
            }
          });
      } else if (onFailure) {
        onFailure();
      }
    });
};

const getBodyID = (
  storyID: string,
  onSuccess: (storyBodyID: string) => void,
) => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .doc(storyID)
    .get()
    .then((document) => {
      const data = document.data();
      if (data) {
        const bodyID = data.body;
        onSuccess(bodyID);
      }
    });
};

const addStory = (story: StoryEntry, onSuccess?: (storyId: string) => void) => {
  const store = firebaseApp.firestore();
  // First we need to create a story body
  // And with the story body ID created from firebase side, we need to create a story.

  // If title statrs with !, the post will not be publicably available.

  const storyBody = story.body;
  store
    .collection('storyBodies')
    .add({ body: storyBody })
    .then((result) => {
      const storyBodyID = result.id;
      // Now we need to create a stroy.
      const isLocked = story.title.charAt(0) === '!';
      store
        .collection('stories')
        .add({
          title: story.title,
          body: storyBodyID,
          created: story.created,
          category: story.category,
          isLocked,
        })
        .then((r) => {
          if (onSuccess) {
            onSuccess(r.id);
          }
        });
    });
};

const editStory = (
  storyID: string,
  edittedStory: StoryEntry,
  onSuccess?: (storyID: string) => void,
) => {
  const store = firebaseApp.firestore();

  // Update the body fires
  getBodyID(storyID, (bodyID) => {
    store
      .collection('storyBodies')
      .doc(bodyID)
      .update({ body: edittedStory.body })
      .then(() => {
        store
          .collection('stories')
          .doc(storyID)
          .update({ title: edittedStory.title })
          .then(() => {
            if (onSuccess) {
              onSuccess(storyID);
            }
          });
      });
  });
};

const getComments = (
  storyId: string,
  onSuccess?: (comments: CommentEntry[]) => void,
) => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .doc(storyId)
    .collection('comments')
    .orderBy('created', 'desc')
    .get()
    .then((snapshot) => {
      const comments: CommentEntry[] = [];
      snapshot.forEach((document) => {
        const data = document.data();
        const date = new Date(0);
        date.setUTCSeconds(data.created.seconds);
        comments.push({
          id: document.id,
          photoURL: data.photoURL,
          name: data.name,
          body: data.body,
          created: date,
        });
      });
      if (onSuccess) {
        onSuccess(comments);
      }
    });
};

const addComment = (
  storyId: string,
  comment: CommentEntry,
  onSuccess?: (commentId: string) => void,
) => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .doc(storyId)
    .collection('comments')
    .add(comment)
    .then((r) => {
      if (onSuccess) {
        onSuccess(r.id);
      }
    });
};

const executeItToAllStories = () => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .get()
    .then((snapshot) => {
      snapshot.forEach((document) => {
        document.ref.update({ hidden: false });
      });
    });
};

const hideStory = (storyID: string, onSuccess?: () => void) => {
  const store = firebaseApp.firestore();
  store
    .collection('stories')
    .doc(storyID)
    .update({
      hidden: true,
    })
    .then(() => {
      if (onSuccess) {
        onSuccess();
      }
    });
};

export {
  getStories,
  getStoryIds,
  addStory,
  getStory,
  getComments,
  addComment,
  editStory,
  executeItToAllStories,
  hideStory,
};
