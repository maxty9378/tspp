import React from 'react';
import { format, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Clock, User, Coffee } from 'lucide-react';

const WEEK_DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

export function Schedule() {
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  
  const schedule = [
    {
      time: '09:00',
      title: 'Открытие программы',
      type: 'speech',
      speaker: 'Иванов И.И.'
    },
    {
      time: '10:30',
      title: 'Кофе-брейк',
      type: 'break'
    },
    // Add more schedule items here
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex overflow-x-auto gap-2 pb-2">
        {WEEK_DAYS.map((day, index) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              index === selectedDay.getDay() - 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => {
              const newDate = new Date();
              newDate.setDate(newDate.getDate() - newDate.getDay() + index + 1);
              setSelectedDay(newDate);
            }}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>{item.time}</span>
            </div>
            
            <h3 className="text-lg font-semibold">{item.title}</h3>
            
            {item.type === 'speech' && item.speaker && (
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>{item.speaker}</span>
              </div>
            )}
            
            {item.type === 'break' && (
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <Coffee className="w-4 h-4" />
                <span>Перерыв</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}