// src/AuthForm.jsx
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default function AuthForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (hasAccount) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="auth-form">
      {auth.currentUser ? (
        <div>
          <p>Bienvenido, {auth.currentUser.email}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>{hasAccount ? "Iniciar sesión" : "Registrarse"}</h3>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {hasAccount ? "Entrar" : "Crear cuenta"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p onClick={() => setHasAccount(!hasAccount)} style={{ cursor: "pointer", marginTop: "10px" }}>
            {hasAccount ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </p>
        </form>
      )}
    </div>
  );
}
