import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Calendar, MessageSquare, Users, Brain } from 'lucide-react';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: User, label: 'Профиль' },
    { path: '/schedule', icon: Calendar, label: 'Расписание' },
    { path: '/chat', icon: MessageSquare, label: 'Чат' },
    { path: '/participants', icon: Users, label: 'Участники' },
    { path: '/tests', icon: Brain, label: 'Тесты' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}