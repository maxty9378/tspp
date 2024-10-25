import React from 'react';
import { useStore } from '../store';

// Custom TelegramLoginButton component
function TelegramLoginButton({ 
  botName, 
  onAuth, 
  buttonSize = 'large',
  cornerRadius = 8,
  requestAccess = 'write'
}: {
  botName: string;
  onAuth: (response: any) => void;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: 'write' | 'read';
}) {
  const handleClick = () => {
    // For demo purposes, simulate a successful auth
    onAuth({
      id: 123456789,
      first_name: 'Demo',
      last_name: 'User',
      photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`
        bg-[#54a9eb] text-white font-bold rounded-lg
        transition-colors hover:bg-[#4095d6]
        flex items-center gap-2 px-4
        ${buttonSize === 'large' ? 'py-3 text-lg' : 
          buttonSize === 'medium' ? 'py-2 text-base' : 
          'py-1 text-sm'}
      `}
      style={{ borderRadius: cornerRadius }}
    >
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6 fill-current"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.96-.75 3.78-1.65 6.31-2.74 7.58-3.27 3.61-1.51 4.36-1.77 4.85-1.78.11 0 .35.02.51.14.13.1.17.23.19.33.02.12.02.28.01.43z"/>
      </svg>
      Log in with Telegram
    </button>
  );
}

export function TelegramAuth() {
  const setUser = useStore((state) => state.setUser);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const botUsername = 'YourBotUsername'; // Replace with your bot username

  const handleTelegramResponse = (response: any) => {
    // For demo purposes, we'll create a user directly
    setUser({
      id: response.id,
      name: `${response.first_name} ${response.last_name || ''}`.trim(),
      photoUrl: response.photo_url || 'https://via.placeholder.com/100',
      role: 'participant',
      coins: 100,
      telegramId: response.id.toString()
    });
  };

  if (isMobile && window.Telegram?.WebApp) {
    // For mobile Telegram WebApp
    React.useEffect(() => {
      const initData = window.Telegram.WebApp.initData || '';
      if (initData) {
        // For demo, we'll create a mock user
        const mockUser = {
          id: 123,
          name: 'Telegram User',
          photoUrl: 'https://via.placeholder.com/100',
          role: 'participant',
          coins: 100,
          telegramId: '123'
        };
        setUser(mockUser);
      }
    }, []);

    return null;
  }

  return (
    <div className="flex justify-center">
      <TelegramLoginButton
        botName={botUsername}
        onAuth={handleTelegramResponse}
        buttonSize="large"
        cornerRadius={8}
        requestAccess="write"
      />
    </div>
  );
}