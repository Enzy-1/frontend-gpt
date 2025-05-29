import React, { useState } from "react";

export default function Register({ onRegisterSuccess }) {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://backend-gpt-tau.vercel.app//api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al registrar");

      alert(`🎉 Usuario ${data.name} registrado con éxito`);
      onRegisterSuccess(data.userId);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-6">
      <input
        type="text"
        placeholder="Usuario"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required 
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-rose-500 text-white py-2 rounded hover:bg-rose-600 transition"
      >
        Crear Cuenta
      </button>
    </form>
  );
}
