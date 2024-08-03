import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';  // Adjust the path if needed
import { itemType } from '@/types';  // Adjust the path if needed

const useFetchItems = () => {
  const [itemsList, setItemsList] = useState<itemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pantry-tracker'));
        console.log("query snapshot:",querySnapshot);
        const items: itemType[] = querySnapshot.docs.map(doc => doc.data() as itemType);
        console.log(items)
        setItemsList(items);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { itemsList, loading, error,setItemsList };
};

export default useFetchItems;
