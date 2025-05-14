
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'reflect-metadata'; // Add this for NestJS decorator support

createRoot(document.getElementById("root")!).render(<App />);
