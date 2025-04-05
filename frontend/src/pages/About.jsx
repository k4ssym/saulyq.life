import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');
  const [expandedRecord, setExpandedRecord] = useState(null);

  // Sample disease history data - replace with API data
  const diseaseHistory = [
    {
      id: 1,
      disease: 'Грипп',
      date: '2023-01-15',
      endDate: '2023-01-29',
      severity: 'Средняя',
      symptoms: 'Высокая температура, озноб, ломота в теле, головная боль',
      diagnosis: 'Грипп типа A',
      treatment: 'Постельный режим, обильное питье, симптоматическое лечение',
      prescription: [
        'Осельтамивир 75 мг 2 раза в день - 5 дней',
        'Парацетамол 500 мг при температуре выше 38.5°C',
        'Ибупрофен 200 мг при болях - 3 раза в день'
      ],
      doctor: 'Др. Иванова Е.П.',
      documents: [
        { id: 101, type: 'Анализ крови', date: '2023-01-16', url: '#' },
        { id: 102, type: 'Заключение терапевта', date: '2023-01-29', url: '#' }
      ]
    },
    {
      id: 2,
      disease: 'COVID-19',
      date: '2022-12-01',
      endDate: '2022-12-11',
      severity: 'Легкая',
      symptoms: 'Потеря обоняния, слабость, субфебрильная температура',
      diagnosis: 'COVID-19 (подтвержден ПЦР)',
      treatment: 'Самоизоляция, контроль сатурации',
      prescription: [
        'Витамин C 500 мг/день',
        'Цинк 25 мг/день',
        'Парацетамол при температуре'
      ],
      doctor: 'Др. Петров А.С.',
      documents: [
        { id: 201, type: 'ПЦР-тест', date: '2022-12-02', url: '#' },
        { id: 202, type: 'КТ легких', date: '2022-12-05', url: '#' }
      ]
    },
    {
      id: 3,
      disease: 'Гастрит',
      date: '2021-05-10',
      endDate: '2021-06-15',
      severity: 'Хронический',
      symptoms: 'Боль в эпигастрии, изжога, тошнота после еды',
      diagnosis: 'Хронический гастрит с повышенной кислотностью',
      treatment: 'Диета, медикаментозная терапия',
      prescription: [
        'Омепразол 20 мг утром - 4 недели',
        'Альмагель по 1 ст.л. 3 раза в день',
        'Диета №1'
      ],
      doctor: 'Др. Сидорова М.К.',
      documents: [
        { id: 301, type: 'ФГДС', date: '2021-05-12', url: '#' },
        { id: 302, type: 'Анализ на H.pylori', date: '2021-05-12', url: '#' }
      ]
    }
  ];

  // Sample health records - same as previous component
  const healthRecords = [
    {
      id: 1,
      type: 'Анализ крови',
      date: '2023-11-15',
      status: 'completed',
      doctor: 'Др. Иванова',
      category: 'lab',
      fileUrl: '#'
    },
    // ... other records
  ];

  // Russian month names for date formatting
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-16">
      {/* Page Header */}
      <div className='pt-10 pb-6'>
        <h1 className='text-3xl text-[#707070]'>
          <span className='text-gray-800 font-semibold'>ИСТОРИЯ БОЛЕЗНЕЙ</span>
        </h1>
        <p className='mt-2 text-gray-600 text-sm'>
          Полная медицинская история и связанные документы
        </p>
      </div>

      {/* Tabs */}
      <div className='flex gap-2 mb-6 border-b pb-2'>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm rounded-t ${activeTab === 'history' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          История болезней
        </button>
        <button 
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2 text-sm rounded-t ${activeTab === 'records' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Медицинские записи
        </button>
      </div>

      {activeTab === 'history' ? (
        /* DISEASE HISTORY SECTION */
        <div className='space-y-6'>
          {diseaseHistory.map((record) => (
            <div 
              key={record.id} 
              className='bg-white rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden'
            >
              <div 
                className='p-4 cursor-pointer hover:bg-[#F9FAFB] transition-colors'
                onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
              >
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='text-lg font-medium text-[#111827]'>{record.disease}</h3>
                    <p className='text-sm text-gray-500 mt-1'>
                      {formatDate(record.date)} — {formatDate(record.endDate)} • {record.doctor}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      record.severity === 'Легкая' ? 'bg-green-100 text-green-800' :
                      record.severity === 'Средняя' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.severity}
                    </span>
                    <img 
                      src={expandedRecord === record.id ? assets.up_arrow : assets.down_arrow} 
                      alt={expandedRecord === record.id ? 'Свернуть' : 'Развернуть'} 
                      className='w-4 opacity-50'
                    />
                  </div>
                </div>
              </div>

              {expandedRecord === record.id && (
                <div className='p-4 pt-0 border-t'>
                  {/* Diagnosis Section */}
                  <div className='mb-4'>
                    <h4 className='font-medium text-[#111827] mb-2'>Диагноз</h4>
                    <p className='text-gray-700'>{record.diagnosis}</p>
                  </div>

                  {/* Symptoms Section */}
                  <div className='mb-4'>
                    <h4 className='font-medium text-[#111827] mb-2'>Симптомы</h4>
                    <p className='text-gray-700'>{record.symptoms}</p>
                  </div>

                  {/* Treatment Section */}
                  <div className='mb-4'>
                    <h4 className='font-medium text-[#111827] mb-2'>Лечение</h4>
                    <p className='text-gray-700'>{record.treatment}</p>
                  </div>

                  {/* Prescription Section */}
                  <div className='mb-4'>
                    <h4 className='font-medium text-[#111827] mb-2'>Назначения</h4>
                    <ul className='list-disc pl-5 space-y-1 text-gray-700'>
                      {record.prescription.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents Section */}
                  <div>
                    <h4 className='font-medium text-[#111827] mb-2'>Документы</h4>
                    <div className='space-y-2'>
                      {record.documents.map((doc) => (
                        <div key={doc.id} className='flex justify-between items-center p-2 bg-gray-50 rounded'>
                          <div>
                            <p className='font-medium'>{doc.type}</p>
                            <p className='text-xs text-gray-500'>{formatDate(doc.date)}</p>
                          </div>
                          <div className='flex gap-2'>
                            <button 
                              onClick={() => window.open(doc.url, '_blank')}
                              className='p-1 text-gray-500 hover:text-primary transition-colors'
                            >
                              <img src={assets.view_icon} alt="Просмотр" className='w-5' />
                            </button>
                            <button 
                              onClick={() => window.open(doc.url, '_blank')}
                              className='p-1 text-gray-500 hover:text-primary transition-colors'
                            >
                              <img src={assets.download_icon} alt="Скачать" className='w-5' />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Online Certificate */}
                  <div className='mt-4 p-3 bg-blue-50 rounded border border-blue-100'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h4 className='font-medium text-blue-800'>Онлайн справка</h4>
                        <p className='text-sm text-blue-600'>Доступна для скачивания и просмотра</p>
                      </div>
                      <button 
                        onClick={() => window.open('#', '_blank')}
                        className='bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors'
                      >
                        Открыть
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* HEALTH RECORDS SECTION (from previous component) */
        <div>
          <div className='bg-white rounded-lg shadow-sm border border-[#E5E7EB]'>
            {healthRecords.length > 0 ? (
              healthRecords.map((record) => (
                <div 
                  key={record.id} 
                  className='p-4 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors duration-200'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-4'>
                      <div className={`p-2 rounded-lg ${
                        record.category === 'lab' ? 'bg-[#EFF6FF]' : 
                        record.category === 'imaging' ? 'bg-[#ECFDF5]' : 
                        'bg-[#F5F3FF]'}`}
                      >
                        <img 
                          src={
                            record.category === 'lab' ? assets.lab_icon : 
                            record.category === 'imaging' ? assets.scan_icon : 
                            assets.consultation_icon
                          } 
                          alt={record.type}
                          className='w-6 h-6'
                        />
                      </div>
                      <div>
                        <h3 className='text-[#111827] font-medium'>{record.type}</h3>
                        <p className='text-sm text-gray-500 mt-1'>
                          {formatDate(record.date)} • {record.doctor}
                        </p>
                        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                          record.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                        >
                          {record.status === 'completed' ? 'Завершено' : 'Ожидается'}
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button 
                        onClick={() => window.open(record.fileUrl, '_blank')}
                        className='p-2 text-gray-500 hover:text-primary transition-colors'
                      >
                        <img src={assets.download_icon} alt="Скачать" className='w-5' />
                      </button>
                      <button 
                        onClick={() => navigate(`/share-record/${record.id}`)}
                        className='p-2 text-gray-500 hover:text-primary transition-colors'
                      >
                        <img src={assets.share_icon} alt="Поделиться" className='w-5' />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='p-8 text-center text-gray-500'>
                <img src={assets.empty_folder_icon} alt="Нет записей" className='w-16 mx-auto mb-4 opacity-60' />
                <p>Нет медицинских записей</p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className='mt-6 flex justify-end'>
            <button 
              onClick={() => document.getElementById('file-upload').click()}
              className='flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors'
            >
              <img src={assets.upload_icon} alt="Загрузить" className='w-4 invert' />
              Загрузить документ
            </button>
            <input type="file" id="file-upload" className='hidden' />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;