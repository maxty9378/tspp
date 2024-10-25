import React from 'react';
import { useStore } from '../store';
import { Trophy, Award } from 'lucide-react';

export function Profile() {
  const user = useStore((state) => state.user);
  const clickCard = useStore((state) => state.clickCard);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div 
        className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 cursor-pointer"
        onClick={clickCard}
      >
        <div className="flex items-center space-x-4">
          <img 
            src={user.photoUrl} 
            alt={user.name} 
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.role === 'organizer' ? 'Организатор' : 'Участник'}</p>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-semibold">{user.coins} coins</span>
          </div>
          <Award className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-blue-800 text-sm">
          Нажмите на карточку профиля, чтобы получить coins!
        </p>
      </div>
    </div>
  );
}