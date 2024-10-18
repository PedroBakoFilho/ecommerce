import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './context/AuthContext'

import './index.css'

import { Toaster } from 'react-hot-toast'


import { register } from 'swiper/element'

register()
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
