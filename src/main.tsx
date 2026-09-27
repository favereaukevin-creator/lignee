import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Simulateur from './Simulateur'
import './styles/base.css'

const cible = document.getElementById('simulateur')
if (cible) createRoot(cible).render(<StrictMode><Simulateur /></StrictMode>)
