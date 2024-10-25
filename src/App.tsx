import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Profile } from './components/Profile';
import { Schedule } from './components/Schedule';
import { Chat } from './components/Chat';
import { Participants } from './components/Participants';
import { Tests } from './components/Tests';
import { useStore } from './store';
import { Coins } from 'lucide-react';
import { TelegramAuth } from './components/TelegramAuth';

function App() {
  const user = useStore((state) => state.user);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">ТСПП2025</h1>
          <p className="text-gray-600 text-center mb-6">
            Войдите через Telegram, чтобы продолжить
          </p>
          <TelegramAuth />
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4 sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">ТСПП2025</h1>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              <span>{user.coins}</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/tests" element={<Tests />} />
          </Routes>
        </main>

        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;