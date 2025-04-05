import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import securityIcon from '../assets/security_icon.svg';
import attachmentIcon from '../assets/attachment_icon.svg';
import cameraIcon from '../assets/camera_icon.svg';
import progressDot from '../assets/progress_dot.svg';
import maskotImage from '../assets/maskot.png';

const Contact = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [showQuestions, setShowQuestions] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Quick actions for user convenience
  const quickActions = [
    "Диагностика",
    "Спросить",
    "Лечение",
    "Осмотр",
    "Консультанты",
    "Стоматолог",
    "Специалисты",
    "Альтернативное",
    "Интерпретация",
    "Оценка здоровья",
    "Инструменты"
  ];
  
  // Questions for the initial analysis
  const questions = [
    { text: "Какой у вас рост (см)?", options: ["< 150", "150-170", "170-190", "> 190"] },
    { text: "Какой у вас вес (кг)?", options: ["< 50", "50-70", "70-90", "> 90"] },
    { text: "Сколько вам лет?", options: ["< 18", "18-30", "30-50", "> 50"] },
    { text: "Есть ли у вас аллергии?", options: ["Да", "Нет", "Не уверен(а)"] },
    { text: "Есть ли у вас хронические заболевания?", options: ["Да", "Нет"] }
  ];

  // Record answers and navigate questions
  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentQuestion].text]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuestions(false);
    }
  };

  // Add user message and simulate AI response
  const sendMessage = () => {
    if (input.trim() === '') return;
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    // Simulate a delay before AI responds
    setTimeout(() => {
      const aiResponse = { sender: 'ai', text: 'Анализирую ваше сообщение... (Заглушка ответа ИИ)' };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle file uploads and simulate processing
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setMessages([...messages, { sender: 'user', text: `📎 Загруженный файл: ${uploadedFile.name}` }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: 'Обрабатываю загруженный документ... (Заглушка ответа ИИ)' }
        ]);
      }, 1000);
    }
  };

  // Once the questions are complete, add a welcome message from the AI bot
  useEffect(() => {
    if (!showQuestions && messages.length === 0) {
      const welcomeMessage = {
        sender: 'ai',
        text: 'Здравствуйте! Я AI Доктор. Пожалуйста, расскажите о своих симптомах или загрузите результаты анализов (например, анализ крови), чтобы я смог провести предварительный анализ.'
      };
      setMessages([welcomeMessage]);
    }
  }, [showQuestions, messages.length]);

  return (
    <div className='relative flex flex-col items-center text-center my-16 text-[#262626] px-4'>
      {/* Page Header */}
      <h1 className='text-3xl font-bold text-blue-500 mb-2'>Добро пожаловать в AI Доктор</h1>
      <p className='mb-6 text-gray-700 max-w-xl'>
        Этот сервис поможет вам провести первоначальный анализ состояния здоровья на основе ваших ответов и загруженных данных.
      </p>

      {/* Instructions and Tips Section */}
      {!showQuestions && (
        <div className='w-full max-w-3xl mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-left'>
          <h2 className='text-xl font-semibold mb-2'>Советы по использованию</h2>
          <ul className='list-disc pl-5 text-gray-800'>
            <li>Ответьте на предложенные вопросы для первоначального анализа.</li>
            <li>При наличии, загрузите результаты анализов (например, анализ крови).</li>
            <li>Задавайте вопросы в чате, и я постараюсь дать рекомендации.</li>
            <li>Учтите, что данная консультация носит информационный характер и не заменяет визит к врачу.</li>
          </ul>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className='flex flex-wrap justify-center gap-3 mt-2'>
        {quickActions.map((action, index) => (
          <button 
            key={index} 
            className='border px-4 py-2 rounded-full text-sm hover:bg-blue-100 transition'
          >
            {action}
          </button>
        ))}
      </div>

      {/* Overlay for Initial Questions */}
      {showQuestions && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-10">
          <div className='w-full max-w-lg border border-gray-300 rounded-xl p-6 bg-white shadow-lg flex flex-col justify-between'>
            <h2 className='text-lg font-medium mb-4'>{questions[currentQuestion].text}</h2>
            <div className='flex flex-wrap justify-center gap-3'>
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(option)} 
                  className='border px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition'
                >
                  {option}
                </button>
              ))}
            </div>
            {/* Progress Indicator */}
            <div className='flex justify-center gap-2 mt-4'>
              {[...Array(questions.length)].map((_, i) => (
                <img 
                  key={i} 
                  src={progressDot} 
                  alt="Прогресс" 
                  className={`w-4 h-4 ${i <= currentQuestion ? 'opacity-100' : 'opacity-30'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Section */}
      {!showQuestions && (
        <>
          {/* Chat History */}
          <div className='w-full max-w-3xl border border-gray-300 rounded-xl overflow-hidden p-4 bg-white shadow-lg mt-6'>
            <div className='h-[500px] overflow-y-auto flex flex-col gap-3 p-3'>
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded-lg w-fit max-w-[75%] flex items-center gap-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-gray-200 text-black self-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <img src={maskotImage} alt="ИИ Доктор" className="w-8 h-8 rounded-full" />
                  )}
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input Section */}
          <div className='flex items-center w-full max-w-3xl border border-gray-300 p-3 rounded-full mt-4 shadow-lg'>
            <label className='cursor-pointer'>
              <input 
                type='file' 
                onChange={handleFileUpload} 
                className='hidden' 
                accept='image/*, .pdf, .docx' 
              />
              <img src={cameraIcon} alt="Камера" className="w-6 h-6 mr-3" />
            </label>
            <label className='cursor-pointer'>
              <input 
                type='file' 
                onChange={handleFileUpload} 
                className='hidden' 
                accept='image/*, .pdf, .docx' 
              />
              <img src={attachmentIcon} alt="Прикрепить" className="w-6 h-6 mr-3" />
            </label>
            <input 
              type='text' 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className='flex-1 p-2 border-none outline-none' 
              placeholder='Напишите сообщение...'
            />
            <button 
              onClick={sendMessage} 
              className='bg-blue-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all'
            >
              Отправить
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Contact;
