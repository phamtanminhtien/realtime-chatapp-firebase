import { useEffect, useState } from "react";
import services from "../services";

const useQuery = (collection, condition) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (!collection || !condition) return;
    if (
      condition.operator === "in" &&
      !(
        Array.isArray(condition.compareValue) ||
        condition.compareValue?.length === 0
      )
    )
      return;
    const queryRef = services.query(collection, condition).orderBy("createdAt");

    const unsubscribed = queryRef.onSnapshot((snapshot) => {
      setDocs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsubscribed;
  }, [collection, condition]);

  return docs;
};

export default useQuery;
