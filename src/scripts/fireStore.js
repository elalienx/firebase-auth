// NPM packages
import { collection, doc, getDocs } from "firebase/firestore/lite";
import { addDoc, setDoc, updateDoc, getDoc } from "firebase/firestore/lite";

// Project files
import { fireStoreInstance } from "./firebase";

// Create
export async function createDocumentWithId(path, id, data) {
  const documentReference = doc(fireStoreInstance, path, id);
  await setDoc(documentReference, data);

  return id;
}

export async function createDocument(path, data) {
  const collectionReference = collection(fireStoreInstance, path);
  const documentReference = await addDoc(collectionReference, data);

  return documentReference.id;
}

// Read
export async function getDocument(path, id) {
  const documentReference = doc(fireStoreInstance, path, id);
  const document = await getDoc(documentReference);

  return { id: document.id, ...document.data() };
}

export async function getCollection(path) {
  const collectionReference = collection(fireStoreInstance, path);
  const snapshot = await getDocs(collectionReference);
  const list = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return list;
}

// Update
export async function updateDocument(path, data) {
  const documentReference = doc(fireStoreInstance, path, data.id);

  await updateDoc(documentReference, data);
}
