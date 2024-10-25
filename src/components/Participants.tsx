import React from 'react';
import { useStore } from '../store';
import { Trophy, Medal } from 'lucide-react';

export function Participants() {
  const users = useStore((state) => state.users);
  
  const sortedUsers = [...users].sort((a, b) => b.coins - a.coins);

  return (
    <div className="space-y-4 pb-20">
      {sortedUsers.map((user, index) => (
        <div
          key={user.id}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div className="relative">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {index < 3 && (
              <div className="absolute -top-2 -right-2">
                <Medal className={`w-6 h-6 ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  'text-amber-600'
                }`} />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold">{user.name}</h3>
            <div className="flex items-center gap-1 text-gray-600">
              <Trophy className="w-4 h-4" />
              <span>{user.coins} coins</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-gray-400">
            #{index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}