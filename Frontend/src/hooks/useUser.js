import { useEffect, useState, useContext } from "react";
import { getUserDataService, updateUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

const useUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserDataService(id, token);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadUser();
  }, [id, token]);

  const updateUser = async (file, idUser, nuevoNombre, token) => {
    await updateUserService(file, idUser, nuevoNombre, token);
    const newUser = await getUserDataService(idUser, token);
    setUser(newUser);
  };

  return { user, error, loading, updateUser };
};

export default useUser;
