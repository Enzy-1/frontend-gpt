import ChatPrompt from './components/ChatPrompt';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-pink-200 flex flex-col items-center p-6 animate-fade-in">
      <h1 className="text-4xl font-bold text-rose-700 mb-6 font-romantic animate-slide-in-down">
        💌 Chat Romántico con IA
      </h1>

      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6 w-full max-w-2xl flex-1 flex flex-col border border-rose-200 animate-fade-in">
        <div className="flex-1 flex flex-col pb-4">
          <ChatPrompt />
        </div>

        <p className="text-center text-rose-500 font-medium text-sm mt-4 animate-fade-in-delay">
          ❤️ Desarrollado con amor por EnzoNet ❤️
        </p>
      </div>
    </div>
  );
}

export default App;
