// eslint-disable-line
const questions = [
  {
    question: "What does mean the word 'sliphold'",
    correctAnswer: ['сливать', 'скользкая хватка'],
  },
  {
    question:
      'Many singers streamed ... online concerts for people around the world (his/it’s/your/their)',
    correctAnswer: ['their'],
  },
  {
    question: "What does mean the word 'sliphold'",
    correctAnswer: ['сливать', 'скользкая хватка'],
  },
  {
    question:
      'Many singers streamed ... online concerts for people around the world (his/it’s/your/their)',
    correctAnswer: ['their'],
  },
  {
    question: "What does mean the word 'sliphold'",
    correctAnswer: ['сливать', 'скользкая хватка'],
  },
  {
    question:
      'Many singers streamed ... online concerts for people around the world (his/it’s/your/their)',
    correctAnswer: ['their'],
  },
  {
    question:
      'Many singers streamed ... online concerts for people around the world (his/it’s/your/their)',
    correctAnswer: ['their'],
  },
  {
    question: "What does mean the word 'sliphold'",
    correctAnswer: ['сливать', 'скользкая хватка'],
  },
  {
    question:
      'Many singers streamed ... online concerts for people around the world (his/it’s/your/their)',
    correctAnswer: ['their'],
  },
];

export const testQuestions = (req, res) => {
  return res.status(200).json(questions);
};
