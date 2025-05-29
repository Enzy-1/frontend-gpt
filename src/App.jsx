import React, { useState } from "react";
import ChatPrompt from "./components/ChatPrompt";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (id) => {
    setUserId(id);
  };

  const handleRegisterSuccess = (id) => {
    setUserId(id);
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-pink-200 flex flex-col items-center p-6 animate-fade-in">
      <h1 className="text-4xl font-bold text-rose-700 mb-6 font-romantic animate-slide-in-down">
        Agenda tu Cita Romántica
      </h1>

      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6 w-full max-w-2xl flex-1 flex flex-col border border-rose-200 animate-fade-in">
        {!userId ? (
          <>
            {showRegister ? (
              <>
                <Register onRegisterSuccess={handleRegisterSuccess} />
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-sm text-rose-500 mt-2 hover:underline"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </>
            ) : (
              <>
                <Login onLoginSuccess={handleLogin} />
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-sm text-rose-500 mt-2 hover:underline"
                >  
                  ¿No tienes cuenta? Regístrate
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <ChatPrompt userId={userId} />
            <button
              onClick={() => setUserId(null)}
              className="text-sm text-rose-500 mt-4 hover:underline"
            >
              Cerrar sesión
            </button>
          </>
        )}

        <p className="text-center text-rose-500 font-medium text-sm mt-6">
          Desarrollado por EnzoNet
        </p>
      </div>
    </div>
  );
}

export default App;
