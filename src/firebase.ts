import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, Firestore, query, updateDoc, doc } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

let app: FirebaseApp;
let db: Firestore;

export const startFirebase = () => {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
};

export const spesaSnapshot = () => query(collection(db, "spesa"));

export const updatePurchased = (id: string, purchased: boolean) => updateDoc(doc(db, "spesa", id), { purchased }); 
