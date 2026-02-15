import { rtdb } from "./firebase";
import {
  ref,
  push,
  set,
  remove,
  onValue,
  query,
  orderByChild,
} from "firebase/database";

// Add bookmark
export const createBookmark = async ({ uid, title, url }) => {
  const bookmarkRef = push(ref(rtdb, `bookmarks/${uid}`));

  return await set(bookmarkRef, {
    title,
    url,
    createdAt: Date.now(),
  });
};

// Delete bookmark
export const removeBookmark = async ({ uid, bookmarkId }) => {
  return await remove(ref(rtdb, `bookmarks/${uid}/${bookmarkId}`));
};

// Realtime listener
export const listenToBookmarks = (uid, callback) => {
  const bookmarksRef = query(ref(rtdb, `bookmarks/${uid}`), orderByChild("createdAt"));

  const unsubscribe = onValue(bookmarksRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      callback([]);
      return;
    }

    const bookmarks = Object.entries(data)
      .map(([id, value]) => ({
        id,
        ...value,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    callback(bookmarks);
  });

  // cleanup function
  return () => unsubscribe();
};
