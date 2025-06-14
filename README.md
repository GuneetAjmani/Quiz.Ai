# Quiz.Ai

QuizMate is an AI-powered, designation-based quiz web application built with React, TypeScript, and Vite. It generates personalized quizzes for users based on their selected professional designation, helping them assess and improve their knowledge in their field.

---

## Features

- **Personalized Quizzes:** Users select their professional designation (e.g., Software Developer, Data Scientist, Digital Marketing, Graphic Designer, Project Manager) and receive a tailored quiz.
- **Dynamic Question Generation:** (Planned/Optional) Integrates with OpenAI's GPT API to generate unique, role-specific quiz questions.
- **Modern Tech Stack:** Built with React, TypeScript, and Vite for fast development and optimal performance.
- **Responsive UI:** Ensures a seamless experience across devices.

---

## How It Works

1. **User selects a designation** from the available options.
2. **QuizMate generates a quiz** with multiple-choice and yes/no questions relevant to the chosen designation.
3. **User completes the quiz** and receives instant feedback.

---

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `/src` - Main React application source code
- `/utils/quizGenerator.ts` - Static quiz question generator based on designation
- `/types` - TypeScript types for questions and professions

---

## Customization

To add or modify quiz questions, edit the file:
```
project/utils/quizGenerator.ts
```
You can add new designations or update questions as needed.

---

## Future Enhancements

- **AI-Generated Quizzes:** Integrate with OpenAI's GPT API to generate quizzes dynamically based on user input.
- **User Authentication:** Allow users to save progress and track performance.
- **Analytics Dashboard:** Provide insights and recommendations based on quiz results.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI GPT API](https://platform.openai.com/docs/api-reference)
