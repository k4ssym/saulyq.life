import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const [quickActions] = useState([
    { id: 1, title: 'У меня жар', icon: assets.fever_icon },
    { id: 2, title: 'Головная боль', icon: assets.headache_icon },
    { id: 3, title: 'Боль в животе', icon: assets.stomach_icon },
    { id: 4, title: 'Аллергическая реакция', icon: assets.allergy_icon },
    { id: 5, title: 'Кашель', icon: assets.cough_icon },
    { id: 6, title: 'Головокружение', icon: assets.dizziness_icon }
  ]);

  const aiConfig = {
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'chat-gpt-4-turbo1.p.rapidapi.com',
      'x-rapidapi-key': '9a0f172768mshc46725afc0019dfp172bddjsn73455f16dc83'
    }
  };

  useEffect(() => {
    if (activeTab === 'analysis') {
      fetchAnalyses();
    }
  }, [activeTab]);

  const fetchAnalyses = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/get-health-records`,
        { recordType: 'analysis' },
        { headers: { token } }
      );
      setAnalyses(data.records);
    } catch (error) {
      toast.error('Не удалось загрузить анализы');
    }
  };

  const handleAIChat = async (prompt) => {
    try {
      const response = await axios.post(
        'https://chat-gpt-4-turbo1.p.rapidapi.com/',
        {
          model: "gpt-4-turbo-preview",
          messages: [{ role: "user", content: prompt }]
        },
        aiConfig
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      toast.error('Сервис ИИ недоступен');
      throw error;
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Неверный формат файла');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Размер файла превышает 5 МБ');
      return;
    }

    setIsAnalyzing(true);

    try {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: `Прикрепил медицинский файл: ${file.name}`,
        sender: 'user',
        timestamp: new Date().toISOString(),
        file: file
      }]);

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(
        `${backendUrl}/api/user/upload-health-record`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token
          }
        }
      );

      const analysis = await handleAIChat(
        `Пользователь загрузил медицинский документ: ${file.name}. Сымитируй подробный анализ этого документа как опытный врач. Включи: 1. Основные показатели 2. Выявленные проблемы 3. Рекомендации`
      );

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: analysis,
          sender: 'ai',
          timestamp: new Date().toISOString(),
          isAnalysis: true
        }
      ]);

      await fetchAnalyses();
    } catch (error) {
      toast.error('Анализ не выполнен');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    try {
      const aiMessage = await handleAIChat(inputMessage);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: aiMessage,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      // Error handled in handleAIChat
    }
    setIsLoading(false);
  };

  const handleQuickAction = async (action) => {
    const context = `Пользователь выбрал быструю опцию: ${action.title}. Ответьте как медицинский специалист. Включите:
      - Краткое объяснение
      - Немедленные меры
      - Когда обращаться за помощью
      - Простые советы по профилактике
      - Задайте один уточняющий вопрос`;
    try {
      const aiMessage = await handleAIChat(context);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: aiMessage,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      // Error handled in handleAIChat
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Global File Input */}
      <input
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        id="fileUploadInput"
        key="fileUpload"
      />

      <div className="flex items-center gap-4 mb-6">
        <img 
          src={assets.ai_doctor_icon} 
          alt="ИИ Доктор" 
          className="w-16 h-16 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ИИ Медицинский Ассистент</h1>
          <p className="text-gray-600">Круглосуточное медицинское консультирование и анализ</p>
        </div>
      </div>
      
      <div className="mb-4">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'chat' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Чат
        </button>
        <button 
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded ${activeTab === 'analysis' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Анализ
        </button>
      </div>

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col h-[600px]">
              <div 
                className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar"
                ref={chatContainerRef}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white ml-8' 
                        : 'bg-gray-50 border border-gray-100 mr-8'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {message.sender === 'ai' && (
                          <img 
                            src={assets.ai_doctor_icon} 
                            className="w-6 h-6 rounded-full" 
                            alt="AI Doctor"
                          />
                        )}
                        <span className="text-xs font-medium text-gray-400">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {message.file ? (
                          <div className="flex items-center gap-2 p-2 bg-white/10 rounded">
                            <img src={assets.file_icon} className="w-5 h-5" alt="File" />
                            <span className="text-sm">{message.file.name}</span>
                          </div>
                        ) : (
                          message.text.split('\n').map((line, i) => (
                            <p key={i} className="text-sm leading-relaxed">{line}</p>
                          ))
                        )}
                      </div>

                      {message.isAnalysis && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <span className="inline-flex items-center gap-1 text-xs bg-white/10 px-2 py-1 rounded">
                            <img src={assets.verified_icon} className="w-3" alt="Verified" />
                            Медицинский анализ ИИ
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      Analyzing your request...
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe symptoms or ask a question..."
                  className="w-full pr-20 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <label
                    htmlFor="fileUploadInput"
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <img src={assets.attachment_icon} className="w-5 h-5" alt="Attach file" />
                  </label>
                  
                  <button
                    onClick={handleSendMessage}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <img src={assets.send_icon} className="w-5 h-5" alt="Send" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <img src={assets.quick_action_icon} className="w-6" alt="Quick Actions" />
              Quick Health Actions
            </h2>
            
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-all text-left"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <img 
                      src={action.icon} 
                      alt={action.title} 
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <h3 className="text-sm font-semibold mb-3 text-gray-500">
                Recent Analyses
              </h3>
              <div className="space-y-2">
                {analyses.slice(0, 3).map((analysis) => (
                  <div 
                    key={analysis._id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => setActiveTab('analysis')}
                  >
                    <img 
                      src={analysis.fileType === 'application/pdf' ? assets.pdf_icon : assets.image_icon} 
                      className="w-8 h-8" 
                      alt="File type" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{analysis.title}</p>
                      <p className="text-xs text-gray-400 truncate">
                        Analyzed {new Date(analysis.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Медицинские анализы</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
            <label 
              htmlFor="fileUploadInput" 
              className="cursor-pointer text-primary hover:text-primary-dark flex flex-col items-center"
            >
              <img src={assets.upload_icon} className="w-16 mb-2" alt="Загрузка" />
              <p>Нажмите здесь, чтобы загрузить медицинский документ</p>
              <p className="text-sm text-gray-500 mt-2">
                Поддерживаемые форматы: PDF, JPG, PNG (макс. 5 МБ)
              </p>
            </label>
            {isAnalyzing && <p className="mt-4 text-sm text-gray-500">Идет анализ файла...</p>}
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-3">История анализов</h3>
            <div className="space-y-3">
              {analyses.map((analysis) => (
                <div key={analysis._id} className="group relative">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img 
                        src={analysis.fileType === 'application/pdf' ? assets.pdf_icon : assets.image_icon} 
                        className="w-8 h-8 flex-shrink-0"
                        alt="Тип файла" 
                      />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{analysis.title}</p>
                        <p className="text-sm text-gray-500 truncate">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                            ИИ-анализ
                          </span>
                          {analysis.description || "Результаты анализа крови в пределах нормы"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {new Date(analysis.date).toLocaleDateString()}
                      </span>
                      <button 
                        onClick={() => window.open(analysis.fileUrl, '_blank')}
                        className="text-primary hover:text-primary-dark whitespace-nowrap"
                      >
                        Просмотр
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {analyses.length === 0 && (
                <>
                  <div className="group relative border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img src={assets.pdf_icon} className="w-8 h-8" alt="PDF" />
                      <div>
                        <p className="font-medium">
                          Отчет по анализу крови.pdf
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Пример
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                            ИИ-анализ
                          </span>
                          Нормальный уровень гемоглобина (13.8 г/дл), немного повышенное количество лейкоцитов.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img src={assets.image_icon} className="w-8 h-8" alt="Рентген" />
                      <div>
                        <p className="font-medium">
                          Рентген грудной клетки.jpg
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Пример
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                            ИИ-анализ
                          </span>
                          Чистые легочные поля, без признаков пневмонии или иных отклонений.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;