import { useEffect, useState } from "react";
import {
  getSingleRecService,
  sendCommentService,
  deleteCommentService,
} from "../services";

const useRec = (id) => {
  const [rec, setRec] = useState({ comments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRec = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getSingleRecService(id);
        console.log(data);

        setRec(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRec();
  }, [id]);

  const addComment = async (id, data, token) => {
    const newComment = await sendCommentService({ id, data, token });
    const newRec = await getSingleRecService(id);
    setRec(newRec);
  };

  const deleteComment = async (recId, idComment, token) => {
    await deleteCommentService({ recId, idComment, token });
    const newRec = await getSingleRecService(id);
    setRec(newRec);
  };

  return { rec, error, loading, addComment, deleteComment };
};

export default useRec;
