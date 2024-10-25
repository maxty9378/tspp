import React from 'react';
import { useStore } from '../store';
import { CheckCircle, XCircle, Award, Trophy } from 'lucide-react';

const DEMO_TESTS = [
  {
    id: 1,
    title: 'Тест по программе ТСПП2025',
    questions: [
      {
        id: 1,
        text: 'Какова основная цель программы ТСПП2025?',
        options: [
          'Развитие soft skills',
          'Технические навыки',
          'Управление проектами',
          'Все вышеперечисленное'
        ],
        correctAnswer: 3
      },
      {
        id: 2,
        text: 'Какие навыки развивает программа?',
        options: [
          'Только технические',
          'Только soft skills',
          'Комплексное развитие навыков',
          'Только управленческие'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        text: 'Сколько длится программа?',
        options: [
          '1 месяц',
          '3 месяца',
          '6 месяцев',
          '12 месяцев'
        ],
        correctAnswer: 2
      }
    ],
    rewardCoins: 50
  },
  {
    id: 2,
    title: 'Основы программирования',
    questions: [
      {
        id: 1,
        text: 'Что такое алгоритм?',
        options: [
          'Набор случайных команд',
          'Последовательность действий для решения задачи',
          'Компьютерная программа',
          'Математическая формула'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'Какой язык программирования лучше всего подходит для веб-разработки?',
        options: [
          'JavaScript',
          'C++',
          'Pascal',
          'Assembly'
        ],
        correctAnswer: 0
      }
    ],
    rewardCoins: 30
  },
  {
    id: 3,
    title: 'Работа в команде',
    questions: [
      {
        id: 1,
        text: 'Какое качество самое важное для работы в команде?',
        options: [
          'Индивидуализм',
          'Коммуникабельность',
          'Соревновательность',
          'Замкнутость'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'Как лучше всего решать конфликты в команде?',
        options: [
          'Игнорировать их',
          'Решать силой',
          'Через конструктивный диалог',
          'Пожаловаться руководству'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        text: 'Что важнее в командной работе?',
        options: [
          'Личный успех',
          'Общий результат',
          'Похвала начальства',
          'Быть лучше других'
        ],
        correctAnswer: 1
      }
    ],
    rewardCoins: 40
  }
];

export function Tests() {
  const [currentTest, setCurrentTest] = React.useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [testResult, setTestResult] = React.useState<{
    completed: boolean;
    earnedCoins: number;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);
  const addCoins = useStore((state) => state.addCoins);

  const handleAnswer = (answerIndex: number) => {
    if (currentTest === null) return;

    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    const test = DEMO_TESTS[currentTest];
    if (!test) return;

    if (newAnswers.length === test.questions.length) {
      const correctAnswers = test.questions.filter(
        (q, i) => q.correctAnswer === newAnswers[i]
      ).length;
      
      const percentage = correctAnswers / test.questions.length;
      const earnedCoins = Math.round(test.rewardCoins * percentage);
      
      addCoins(earnedCoins);
      setTestResult({
        completed: true,
        earnedCoins,
        correctAnswers,
        totalQuestions: test.questions.length
      });
      
      setTimeout(() => {
        setCurrentTest(null);
        setCurrentQuestion(0);
        setAnswers([]);
        setTestResult(null);
      }, 3000);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  if (currentTest === null) {
    return (
      <div className="space-y-4 pb-20">
        {DEMO_TESTS.map((test, index) => (
          <div
            key={test.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
            <div className="flex items-center justify-between text-gray-600">
              <span>{test.questions.length} вопросов</span>
              <div className="flex items-center gap-1">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>{test.rewardCoins} coins</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentTest(index)}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Начать тест
            </button>
          </div>
        ))}
      </div>
    );
  }

  const test = DEMO_TESTS[currentTest];
  if (!test) return null;

  const question = test.questions[currentQuestion];
  if (!question) return null;

  if (testResult) {
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="mb-4">
            {testResult.correctAnswers === testResult.totalQuestions ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            ) : (
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
            )}
          </div>
          <h3 className="text-xl font-bold mb-4">Тест завершен!</h3>
          <p className="text-gray-600 mb-2">
            Правильных ответов: {testResult.correctAnswers} из {testResult.totalQuestions}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            Получено {testResult.earnedCoins} coins
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Вопрос {currentQuestion + 1} из {test.questions.length}
            </span>
            <div className="flex items-center gap-1">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>{test.rewardCoins} coins</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / test.questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">{question.text}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}