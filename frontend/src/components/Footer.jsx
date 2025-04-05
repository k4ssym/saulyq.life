import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:flex-row justify-between items-center text-sm gap-10 my-10 mt-40'>
        <div className='text-center sm:text-left'>
          <img className='mb-5 w-40 mx-auto sm:mx-0' src={assets.logo} alt='' />
          <p className='w-full md:w-2/3 text-gray-600 leading-6 mx-auto sm:mx-0'>
          Saulyq AI - платформа, которая помогает жителям Казахстана находить проверенных врачей, записываться на приём онлайн и получать персонализированные рекомендации на основе ИИ. 
          </p>
        </div>

        <div className='text-center sm:text-left'>
          <p className='text-xl font-medium mb-5'>MedTech Startup🚀</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Главная</li>
            <li>О нас</li>
            <li>Врачи</li>
            <li>Политика конфиденциальности</li>
          </ul>
        </div>

        <div className='text-center sm:text-left'>
          <p className='text-xl font-medium mb-5'>Свяжитесь с нами</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+7 776 137 3367</li>
            <li>saulyqai@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>2025 - SaulyqAI - Все права защищены</p>
      </div>
    </div>
  );
};

export default Footer;
