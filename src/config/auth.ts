import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "./firebase"; // Asegúrate de que está bien configurado

export const registrar = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const iniciarSesion = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const loginConGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const restablecerContrasena = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const cerrarSesion = () => {
  return signOut(auth);
};
