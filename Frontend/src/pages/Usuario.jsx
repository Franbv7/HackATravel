import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { updateUserService } from "../services";

import { UserRecs } from "../components/RecomendacionesUsuario";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";
import { ScrollToTopButton } from "../components/Scroll";

import { AuthContext } from "../context/AuthContext";

import useUser from "../hooks/useUser";

import "../Styles/Usuario.css";

const baseURL = import.meta.env.VITE_API_URL;

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error, updateUser } = useUser(id);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarError, setAvatarError] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [isNameEdited, setIsNameEdited] = useState(false);

  const { user: loggedUser, token } = useContext(AuthContext);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewUserName(newName);
    setIsNameEdited(true);
  };
  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    try {
      updateUser(
        avatarFile,
        user[0].id,
        isNameEdited ? newUserName : user[0].nombre,
        token
      );
    } catch (error) {
      setAvatarError(
        "Error al subir el avatar. Por favor, inténtalo de nuevo."
      );
      console.error(error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;
  return (
    <section className="user-page">
      <section className="user-data">
        <div className="foto-y-datos">
          {user[0].avatar ? (
            <div className="user-page-avatar">
              <img
                className="user-page-avatar-image"
                src={`${baseURL}/uploads/avatarUser/${user[0].avatar}`}
                alt={user[0].nombre}
              />
            </div>
          ) : (
            <img
              className="user-page-avatar"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Avatar"
            />
          )}
          <div className="datos">
            <p>Nick: {user[0].nombre}</p>

            <p>
              Usuario desde:{" "}
              {new Date(user[0].fecha_registro).toLocaleDateString()}
            </p>
          </div>
        </div>
        {loggedUser.id === user[0].id ? (
          <section className="user-update">
            <label>
              Nuevo Nick:{" "}
              <input
                type="text"
                value={newUserName}
                onChange={handleNameChange}
              />
            </label>
            <div className="inputs-y-foto">
              <div className="inputs">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="input-file"
                  />

                  <figure>
                    <figcaption>Selecionar avatar</figcaption>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="recom"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </figure>
                </label>
                <figure onClick={handleAvatarUpload}>
                  <figcaption>Confirmar cambios</figcaption>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="var(--action)"
                    className="recom userUpdate-button"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </figure>
              </div>
              {avatarFile ? (
                <figure className="user-page-avatar">
                  <img
                    src={URL.createObjectURL(avatarFile)}
                    className="user-page-avatar-image"
                    alt="Preview"
                  />
                </figure>
              ) : null}
              {avatarError && <p>{avatarError}</p>}
            </div>
          </section>
        ) : null}
      </section>
      <section className="user-recs">
        <UserRecs id={user[0].id} />
      </section>
      <ScrollToTopButton />
    </section>
  );
};
