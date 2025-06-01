import React from 'react';
import { Search } from 'lucide-react';
import type { Profession } from '../types';

interface QuizSelectorProps {
  onProfessionSelect: (profession: Profession) => void;
}

const professions: Profession[] = [
  "Software Developer",
  "Data Scientist",
  "Digital Marketing",
  "Graphic Designer",
  "Project Manager"
];

export function QuizSelector({ onProfessionSelect }: QuizSelectorProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredProfessions = professions.filter(profession =>
    profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search professions..."
          className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 text-sm sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(true)}
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
      </div>
      
      {isOpen && (
        <div className="absolute w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {filteredProfessions.map((profession) => (
            <button
              key={profession}
              className="w-full px-4 py-2.5 text-left text-slate-300 hover:bg-slate-700/50 focus:outline-none text-sm sm:text-base"
              onClick={() => {
                onProfessionSelect(profession);
                setIsOpen(false);
                setSearchTerm('');
              }}
            >
              {profession}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}