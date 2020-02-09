import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCaDMpw1dv6KvhL899dJK8jprpx9JvRGkI",
  authDomain: "crownonlineshopping.firebaseapp.com",
  databaseURL: "https://crownonlineshopping.firebaseio.com",
  projectId: "crownonlineshopping",
  storageBucket: "crownonlineshopping.appspot.com",
  messagingSenderId: "274258015942",
  appId: "1:274258015942:web:3388dd9668a8038feb49c7",
  measurementId: "G-53HE94R188"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


// ***** Send local data to firebase ***** //
// export const createCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();
//   objectsToAdd.forEach(obj => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });

//   return await batch.commit();
// }
// ***** Send local data to firebase ***** //

