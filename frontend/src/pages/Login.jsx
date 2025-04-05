import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  // Изначально показываем форму регистрации
  const [state, setState] = useState('Регистрация')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Регистрация') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Регистрация' ? 'Создать аккаунт' : 'Вход'}</p>
        <p>
          {state === 'Регистрация'
            ? 'Пожалуйста, зарегистрируйтесь, чтобы записаться на прием'
            : 'Пожалуйста, войдите, чтобы записаться на прием'}
        </p>
        {state === 'Регистрация'
          ? <div className='w-full '>
            <p>Полное имя</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          : null
        }
        <div className='w-full '>
          <p>Электронная почта</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Пароль</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Регистрация' ? 'Создать аккаунт' : 'Войти'}
        </button>
        {state === 'Регистрация'
          ? <p>Уже есть аккаунт? <span onClick={() => setState('Вход')} className='text-primary underline cursor-pointer'>Войдите здесь</span></p>
          : <p>Создать новый аккаунт? <span onClick={() => setState('Регистрация')} className='text-primary underline cursor-pointer'>Нажмите здесь</span></p>
        }
      </div>
    </form>
  )
}

export default Login
