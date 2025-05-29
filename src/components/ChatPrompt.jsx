import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { FaPaperPlane, FaHeart, FaUserAlt, FaRobot } from 'react-icons/fa'

const ChatPrompt = ({ userId }) => {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  const conversationsEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    conversationsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    const newConvo = [...conversations, { role: 'user', content: prompt }]
    setConversations(newConvo)
    setPrompt('')

    try {
      const res = await axios.post('https://backend-gpt-tau.vercel.app/api/chat', { 
        userId,  // aquí enviamos userId junto con prompt
        prompt 
      })
      setConversations([...newConvo, { role: 'assistant', content: res.data.response }])
    } catch {
      setConversations([...newConvo, { role: 'assistant', content: '💔 Lo siento, no pude responder ahora. Intenta más tarde.' }])
    } finally {
      setIsLoading(false)
      textareaRef.current?.focus()
    }
  }

  const formatText = (text) =>
    text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)

  return (
    <div className="max-w-2xl mx-auto bg-pink-50 border border-rose-200 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
      {/* Encabezado del chat */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white text-center py-5 px-6 flex items-center justify-center gap-3">
        <FaHeart className="text-2xl animate-pulse" />
        <h2 className="text-2xl font-semibold font-serif tracking-wide">Clara</h2>
      </div>

      {/* Cuerpo del chat */}
      <div className="h-[430px] overflow-y-auto px-5 py-6 space-y-5 bg-gradient-to-b from-pink-100 to-rose-50">
        {conversations.length === 0 ? (
          <div className="text-center text-rose-500 mt-16 animate-fade-in-slow">
            <p className="text-lg font-semibold">¡Hola! 🥰</p>
            <p className="text-sm">Estoy aquí para hablar del amor, de tus emociones... o simplemente escucharte.</p>
          </div>
        ) : (
          <>
            {conversations.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-chat-bubble`}
              >
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-pink-500 text-white rounded-tr-none'
                    : 'bg-white text-rose-700 border border-rose-200 rounded-tl-none'
                }`}>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                    {msg.role === 'user' ? (
                      <><FaUserAlt /> Tú</>
                    ) : (
                      <><FaRobot className="text-rose-500" /> Clara</>
                    )}
                  </div>
                  <div className="text-sm leading-relaxed">{formatText(msg.content)}</div>
                </div>
              </div>
            ))}
            <div ref={conversationsEndRef} />
          </>
        )}

        {isLoading && (
          <div className="flex justify-start animate-fade-in-fast">
            <div className="max-w-[75%] px-4 py-3 bg-white border border-rose-200 text-rose-700 rounded-2xl rounded-tl-none shadow-md">
              <div className="flex gap-1 text-sm font-semibold items-center mb-1">
                <FaRobot /> Clara
              </div>
              <div className="flex gap-2 mt-1 animate-pulse">
                <div className="w-2 h-2 bg-rose-400 rounded-full" />
                <div className="w-2 h-2 bg-rose-300 rounded-full" />
                <div className="w-2 h-2 bg-rose-200 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input del usuario */}
      <form onSubmit={handleSubmit} className="bg-pink-100 border-t border-rose-200 px-5 py-4">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escríbele algo bonito al AmorBot..."
          rows={2}
          disabled={isLoading}
          className="w-full p-3 rounded-xl bg-white text-rose-700 border border-rose-300 shadow-inner focus:ring-2 focus:ring-rose-400 resize-none transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="mt-3 w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white py-2 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaPaperPlane /> Enviar
        </button>
        <p className="text-xs text-center text-rose-400 mt-1 italic">
          {isLoading ? '✨ Clara está escribiendo algo especial para ti...' : 'Presiona Enter para enviar'}
        </p>
      </form>
    </div>
  )
}

export default ChatPrompt
