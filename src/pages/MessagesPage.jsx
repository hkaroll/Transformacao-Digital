import { useState, useEffect } from 'react';
import { 
  Search, MessageSquare, Send, 
  CheckCheck, MoreVertical, Paperclip, Smile, ArrowLeft
} from 'lucide-react';

export default function MessagesPage({ userData }) {
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);
  const [announcement, setAnnouncement] = useState('');

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

  const currentChat = conversations.find(c => c.id === activeChat);

  const handleSelectChat = (chat) => {
    setActiveChat(chat.id);
    setIsChatActive(true);
    setAnnouncement(`Conversa com ${chat.name} aberta.`);
  };

  const handleBackToList = () => {
    setIsChatActive(false);
    setAnnouncement("Voltado para a lista de conversas.");
  };

  return (
    <div className="h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] bg-[#F1F5F9] flex font-sans text-slate-900 overflow-hidden pb-16 lg:pb-0">
      
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className="flex flex-1 w-full bg-white overflow-hidden relative">
        
        <section 
          className={`w-full lg:w-96 border-r border-slate-200 flex flex-col shrink-0 bg-white transition-all duration-300 absolute lg:relative inset-0 z-20 ${
            isChatActive ? '-translate-x-full lg:translate-x-0 pointer-events-none lg:pointer-events-auto' : 'translate-x-0'
          }`}
          aria-label="Lista de conversas"
        >
          <div className="p-4 md:p-6 border-b border-slate-50">
            <h2 className="text-xl font-black text-slate-800 mb-4 tracking-tight">Mensagens</h2>
            <div className="relative group">
              <label htmlFor="search-chats" className="sr-only">Buscar conversas</label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} aria-hidden="true" />
              <input 
                id="search-chats"
                type="text" 
                placeholder="Buscar conversas..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto" role="list" aria-label="Conversas abertas">
            {conversations.map((chat) => {
              const isSelected = activeChat === chat.id;
              return (
                <button 
                  key={chat.id}
                  role="listitem"
                  onClick={() => handleSelectChat(chat)}
                  aria-current={isSelected ? "true" : undefined}
                  className={`w-full p-4 md:p-5 flex gap-4 transition-all border-l-4 cursor-pointer relative focus-visible:outline-none focus-visible:bg-blue-50/30 focus-visible:border-blue-500 ${
                    isSelected 
                      ? 'bg-blue-50/50 border-blue-600' 
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-sm" aria-hidden="true">
                      {chat.initials}
                    </div>
                    {chat.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" title="Mensagem não lida"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900 text-[15px] tracking-tight truncate">
                        {chat.name}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{chat.time}</span>
                    </div>
                    <p className="text-[11px] font-bold text-blue-500 uppercase tracking-wide mb-1 truncate">{chat.role}</p>
                    <p className="text-xs text-slate-500 truncate font-medium">
                      {chat.chatHistory[chat.chatHistory.length - 1].text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section 
          className={`flex-1 bg-slate-50 flex flex-col relative w-full h-full transition-all duration-300 absolute lg:relative inset-0 z-30 lg:z-10 ${
            isChatActive ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
          aria-label={currentChat ? `Janela de conversa com ${currentChat.name}` : "Nenhuma conversa selecionada"}
        >
          {currentChat ? (
            <>
              <header className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <button 
                    onClick={handleBackToList}
                    className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-blue-600 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Voltar para a lista de mensagens"
                  >
                    <ArrowLeft size={20} aria-hidden="true" />
                  </button>

                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xs shrink-0" aria-hidden="true">
                    {currentChat.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-base tracking-tight leading-tight truncate">
                      {currentChat.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${currentChat.online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} aria-hidden="true"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {currentChat.online ? 'Online agora' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400" aria-label="Mais opções da conversa">
                  <MoreVertical size={18} aria-hidden="true" />
                </button>
              </header>

              <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-4 md:space-y-6 bg-[#F8FAFC]">
                {currentChat.chatHistory.map((msg) => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div key={msg.id} className={`flex gap-2 md:gap-3 max-w-xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                      <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white text-[9px] font-black ${isMe ? 'bg-slate-800' : 'bg-blue-600'}`} aria-hidden="true">
                        {isMe ? 'EU' : currentChat.initials}
                      </div>
                      <div className={`p-3.5 md:p-4 rounded-2xl shadow-sm border text-slate-800 ${
                        isMe 
                          ? 'bg-[#0D1F3D] text-white border-transparent rounded-tr-none' 
                          : 'bg-white text-slate-700 border-slate-200 rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed font-medium break-words">
                          {msg.text}
                        </p>
                        <div className={`flex items-center gap-1 mt-1.5 ${isMe ? 'justify-end' : ''}`}>
                          <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                            {msg.time}
                          </span>
                          {isMe && <CheckCheck size={12} className="text-blue-400" aria-hidden="true" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-white border-t border-slate-200">
                <form 
                  onSubmit={(e) => e.preventDefault()}
                  className="max-w-4xl mx-auto flex items-center gap-2 bg-slate-50 rounded-2xl p-1.5 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white transition-all"
                >
                  <button type="button" className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Adicionar Emoji"><Smile size={20} aria-hidden="true" /></button>
                  <button type="button" className="p-2 text-slate-400 hover:text-blue-600 transition-colors border-r border-slate-200 pr-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Anexar arquivo de mídia"><Paperclip size={20} aria-hidden="true" /></button>
                  
                  <label htmlFor="message-input" className="sr-only">Digitar mensagem</label>
                  <input 
                    id="message-input"
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Responder a ${currentChat.name}...`} 
                    className="flex-1 bg-transparent py-2 px-3 text-sm font-medium outline-none text-slate-800"
                  />
                  <button type="submit" className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Enviar mensagem">
                    <Send size={18} aria-hidden="true" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="hidden lg:flex flex-1 flex-col items-center justify-center text-slate-300 gap-4" role="status">
              <MessageSquare size={60} strokeWidth={1} className="opacity-20" aria-hidden="true" />
              <p className="text-xs font-black uppercase tracking-[0.2em]">Selecione uma conversa para começar</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}