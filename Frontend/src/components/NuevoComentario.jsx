import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import useRec from "../hooks/useRec";

export const NewComment = ({ id, addComment }) => {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData(e.target);

      addComment(id, data, token);

      e.target.reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="new-comment" onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="comment">
            <input
              className="inputText"
              type="text"
              id="comment"
              name="comment"
              placeholder="Añade tu comentario..."
              required
            />
          </label>
          <button className="recom">Publicar</button>
        </fieldset>
      </form>
    </div>
  );
};
