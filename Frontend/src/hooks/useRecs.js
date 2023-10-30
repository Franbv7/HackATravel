import { useEffect, useState, useContext } from "react";

import { getAllRecsService, getUserRecsService } from "../services";
import { AuthContext } from "../context/AuthContext";

const useRecs = (id) => {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadRecs = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = id
          ? await getUserRecsService(id, token)
          : await getAllRecsService();

        setRecs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecs();
  }, [id]);

  const addRec = (data) => {
    setRecs([data, ...recs]);
  };

  const removeRec = (id) => {
    setRecs(recs.filter((rec) => rec.id !== id));
  };

  return { recs, error, loading, addRec, removeRec };
};

export default useRecs;
