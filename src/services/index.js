import { db } from "../firebase/config";
import firebase from "firebase";

const add = (collection, data) => {
  return db.collection(collection).add({
    ...data,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};

const query = (collection, condition) => {
  const { field, operator, compareValue } = condition;
  return db.collection(collection).where(field, operator, compareValue);
};

const services = { add, query };
export default services;
