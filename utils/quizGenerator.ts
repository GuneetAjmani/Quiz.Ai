import type { Question, Profession } from '@/types';

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
      {
        id: 1,
        question: "What is the purpose of data normalization?",
        options: [
          "To make data look prettier",
          "To scale features to a similar range",
          "To delete outliers",
          "To create more data"
        ],
        correctAnswer: "To scale features to a similar range",
        type: "multiple"
      },
      {
        id: 2,
        question: "What is the difference between supervised and unsupervised learning?",
        options: [
          "Supervised costs more money",
          "Supervised requires labeled data, unsupervised doesn't",
          "Supervised is faster",
          "There is no difference"
        ],
        correctAnswer: "Supervised requires labeled data, unsupervised doesn't",
        type: "multiple"
      },
      {
        id: 3,
        question: "Have you worked with deep learning frameworks?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        type: "yesno",
        content: "That's alright! Deep learning frameworks like TensorFlow and PyTorch are powerful tools for building neural networks. Keep learning!"
      }
    ],
    "Digital Marketing": [
      {
        id: 1,
        question: "What is SEO?",
        options: [
          "Social media optimization",
          "Search engine optimization",
          "Sales enhancement operations",
          "System enhancement overview"
        ],
        correctAnswer: "Search engine optimization",
        type: "multiple"
      },
      {
        id: 2,
        question: "What is the purpose of A/B testing?",
        options: [
          "To test website loading speed",
          "To compare two versions of content",
          "To check for broken links",
          "To analyze competitors"
        ],
        correctAnswer: "To compare two versions of content",
        type: "multiple"
      },
      {
        id: 3,
        question: "Have you run paid advertising campaigns?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        type: "yesno",
        content: "No problem! Paid advertising is a crucial skill in digital marketing. This quiz will help you understand its importance."
      }
    ],
    "Graphic Designer": [
      {
        id: 1,
        question: "What is the purpose of white space in design?",
        options: [
          "To save ink when printing",
          "To create visual hierarchy and balance",
          "To make designs simpler",
          "It serves no purpose"
        ],
        correctAnswer: "To create visual hierarchy and balance",
        type: "multiple"
      },
      {
        id: 2,
        question: "What is the difference between RGB and CMYK?",
        options: [
          "One is for web, one for print",
          "They are the same thing",
          "One is older than the other",
          "One is more expensive"
        ],
        correctAnswer: "One is for web, one for print",
        type: "multiple"
      },
      {
        id: 3,
        question: "Do you use design systems in your work?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        type: "yesno",
        content: "That's okay! Design systems help maintain consistency across projects. They're becoming increasingly important in modern design workflows."
      }
    ],
    "Project Manager": [
      {
        id: 1,
        question: "What is the critical path in project management?",
        options: [
          "The most expensive tasks",
          "The sequence of tasks that determines the project duration",
          "The riskiest tasks",
          "The easiest tasks"
        ],
        correctAnswer: "The sequence of tasks that determines the project duration",
        type: "multiple"
      },
      {
        id: 2,
        question: "What is the purpose of a stakeholder analysis?",
        options: [
          "To determine project budget",
          "To identify and understand people affected by the project",
          "To schedule meetings",
          "To assign tasks"
        ],
        correctAnswer: "To identify and understand people affected by the project",
        type: "multiple"
      },
      {
        id: 3,
        question: "Have you managed agile projects?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        type: "yesno",
        content: "That's fine! Agile project management is a flexible approach that emphasizes iterative development and continuous feedback. It's becoming increasingly popular across industries."
      }
    ]
  };

  return questions[profession];
}