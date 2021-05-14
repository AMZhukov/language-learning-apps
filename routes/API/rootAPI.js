/* eslint-disable */
import { Router } from 'express';
/* eslint-enable */
export const rootAPI = Router();

const questions = [
  {
    question: "What does mean the word 'sliphold'",
    correctAnswer: ['сливать', 'скользкая хватка'],
  },
  {
    question:
      'Many singers streamed ... online concerts for people around the world (his/it’s/your/their (1))',
    correctAnswer: ['their'],
  },
];

rootAPI.post('/registration', (req, res) => {
  console.log(req.body.firstName);
  res.status(200).json('ANSWER FROM ROUTE REGISTRATION');
});

rootAPI.get('/testQuestions', (req, res) => {
  res.status(200).json(questions);
});
