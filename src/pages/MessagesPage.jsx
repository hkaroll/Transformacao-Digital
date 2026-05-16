import { useState } from 'react';
import { 
  Search, MessageSquare, Building, User, Send, 
  CheckCheck, MoreVertical, Paperclip, Smile
} from 'lucide-react';

export default function MessagesPage({ userData }) {
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState('');

  // 1. Dados das conversas com as mensagens individuais de cada uma
  const [conversations] = useState([
    {
      id: 1,
      name: "Tech Innovators",
      role: "Desenvolvedor Front-End Jr",
      time: "10:30",
      unread: true,
      initials: "TI",
      online: true,
      chatHistory: [
        { id: 1, sender: 'them', text: `Olá ${userData?.nome || 'Karoll'}! Vimos seu currículo e gostamos muito. Aceita uma entrevista amanhã?`, time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Olá! Com certeza, amanhã às 14h funciona para vocês?', time: '10:35 AM' }
      ]
    },
    {
      id: 2,
      name: "Creative Studio",
      role: "Designer UI/UX",
      time: "Ontem",
      unread: true,
      initials: "CS",
      online: false,
      chatHistory: [
        { id: 1, sender: 'them', text: 'Poderia nos enviar seu portfólio do Behance?', time: 'Ontem' },
        { id: 2, sender: 'me', text: 'Claro, segue o link: behance.net/karoll-dev', time: 'Ontem' },
        { id: 3, sender: 'them', text: 'Recebido! Vamos analisar.', time: 'Ontem' }
      ]
    },
    {
      id: 3,
      name: "Marketing Pro",
      role: "Assistente de Marketing",
      time: "2d atrás",
      unread: false,
      initials: "MP",
      online: true,
      chatHistory: [
        { id: 1, sender: 'them', text: 'Obrigado pela candidatura! Entraremos em contato em breve.', time: 'Segunda' }
      ]
    }
  ]);

  // 2. Encontra os dados da conversa que está clicada no momento
  const currentChat = conversations.find(c => c.id === activeChat);

  return (
    <div className="h-[calc(100vh-80px)] bg-[#F1F5F9] flex font-sans text-slate-900 overflow-hidden">
      
      <div className="flex flex-1 w-full bg-white overflow-hidden">
        
        {/* COLUNA ESQUERDA: LISTA DE CONVERSAS */}
        <section className="w-80 md:w-96 border-r border-slate-200 flex flex-col shrink-0 bg-white">
          <div className="p-6 border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">Mensagens</h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Buscar conversas..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <button 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full p-5 flex gap-4 transition-all border-l-4 cursor-pointer relative ${
                  activeChat === chat.id 
                  ? 'bg-blue-50/50 border-blue-600' 
                  : 'border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xs">
                    {chat.initials}
                  </div>
                  {chat.unread && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-900 text-[15px] tracking-tight truncate">
                      {chat.name}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">{chat.time}</span>
                  </div>
                  <p className="text-[11px] font-bold text-blue-500 uppercase tracking-wide mb-1">{chat.role}</p>
                  <p className="text-xs text-slate-500 truncate font-medium">
                    {chat.chatHistory[chat.chatHistory.length - 1].text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* COLUNA DIREITA: JANELA DE CHAT DINÂMICA */}
        <section className="flex-1 bg-slate-50 flex flex-col relative">
          {currentChat ? (
            <>
              {/* Header Dinâmico */}
              <header className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xs">
                    {currentChat.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base tracking-tight leading-tight">
                      {currentChat.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${currentChat.online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {currentChat.online ? 'Online agora' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
                  <MoreVertical size={18} />
                </button>
              </header>

              {/* Área de Mensagens que muda conforme o clique */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6">
                {currentChat.chatHistory.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 max-w-xl ${msg.sender === 'me' ? 'ml-auto flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-bold ${msg.sender === 'me' ? 'bg-slate-800' : 'bg-blue-600'}`}>
                      {msg.sender === 'me' ? 'ME' : currentChat.initials}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm border ${
                      msg.sender === 'me' 
                      ? 'bg-[#0D1F3D] text-white border-transparent rounded-tr-none' 
                      : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'
                    }`}>
                      <p className="text-[14px] leading-relaxed font-medium">
                        {msg.text}
                      </p>
                      <div className={`flex items-center gap-1 mt-2 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${msg.sender === 'me' ? 'text-slate-400' : 'text-slate-400'}`}>
                          {msg.time}
                        </span>
                        {msg.sender === 'me' && <CheckCheck size={12} className="text-blue-400" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de Mensagem */}
              <div className="p-6 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto flex items-center gap-3 bg-slate-50 rounded-2xl p-1.5 border border-slate-200">
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"><Smile size={20}/></button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors border-r border-slate-200 pr-3"><Paperclip size={20}/></button>
                  <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Responder a ${currentChat.name}...`} 
                    className="flex-1 bg-transparent py-2 px-3 text-sm font-medium outline-none"
                  />
                  <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md cursor-pointer">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-4">
              <MessageSquare size={60} strokeWidth={1} className="opacity-20" />
              <p className="text-xs font-black uppercase tracking-[0.2em]">Selecione uma conversa para começar</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}