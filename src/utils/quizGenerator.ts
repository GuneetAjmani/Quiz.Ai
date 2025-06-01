import type { Question, Profession } from '../types';

export const generateQuestions = (profession: Profession): Question[] => {
  // In a real application, these would come from an API or database
  const questions: Record<Profession, Question[]> = {
    "Software Developer": [
      {
        id: 1,
        question: "What is the primary purpose of version control systems like Git?",
        options: [
          "To write code faster",
          "To track changes and collaborate on code",
          "To compile code",
          "To debug applications"
        ],
        correctAnswer: "To track changes and collaborate on code",
        type: "multiple"
      },
      {
        id: 2,
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close the browser",
          "A function that has access to variables in its outer scope",
          "A method to end a program",
          "A type of loop"
        ],
        correctAnswer: "A function that has access to variables in its outer scope",
        type: "multiple"
      },
      {
        id: 3,
        question: "Have you worked with modern JavaScript frameworks?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        type: "yesno",
        content: "That's okay! Modern JavaScript frameworks like React, Vue, and Angular are essential tools in web development. This quiz will help you understand their importance."
      },
      {
        id: 4,
        question: "What is the purpose of dependency injection?",
        options: [
          "To reduce file size",
          "To manage component dependencies",
          "To increase performance",
          "To style components"
        ],
        correctAnswer: "To manage component dependencies",
        type: "multiple"
      },
      {
        id: 5,
        question: "What is the role of a package manager?",
        options: [
          "To write tests",
          "To manage project dependencies",
          "To deploy applications",
          "To debug code"
        ],
        correctAnswer: "To manage project dependencies",
        type: "multiple"
      },
      {
        id: 6,
        question: "Do you have experience with test-driven development (TDD)?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        type: "yesno",
        content: "No worries! TDD is a development process that relies on very short development cycles. It's a great skill to learn for writing more reliable code."
      }
    ],
    "Data Scientist": [
      // Similar pattern for other professions...
      // Add questions with every third one being yes/no
    ],
    "Digital Marketing": [
      // Add questions with every third one being yes/no
    ],
    "Graphic Designer": [
      // Add questions with every third one being yes/no
    ],
    "Project Manager": [
      // Add questions with every third one being yes/no
    ]
  };

  return questions[profession];
};