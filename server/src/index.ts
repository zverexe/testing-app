import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import knex from './knex'

const getKnowledgeCheckBlocks = async (req: Request, res: Response) => {
  try {
    const rows = await knex('knowledgeCheckBlocks')
      .select(
        'knowledgeCheckBlocks.id as blockId',
        'knowledgeCheckBlocks.feedback',
        'questions.text as questionText',
        'media.type as mediaType',
        'media.url as mediaUrl',
        'answers.id as answerId',
        'answers.text as answerText',
        'answers.isCorrect as isCorrect',
        'answers.pos as answerPosition',
        'userAnswers.answerId as userAnswerId' // include the user's saved answer
      )
      .leftJoin('questions', 'knowledgeCheckBlocks.questionId', 'questions.id')
      .leftJoin('media', 'questions.mediaId', 'media.id')
      .leftJoin('answers', 'answers.knowledgeCheckBlockId', 'knowledgeCheckBlocks.id')
      .leftJoin('userAnswers', 'knowledgeCheckBlocks.id', 'userAnswers.blockId') // join with the user's saved answer
      .orderBy('answers.pos');

    const groupedData = rows.reduce((acc, row) => {
      let block = acc[row.blockId];
      if (!block) {
        block = {
          blockId: row.blockId,
          feedback: row.feedback,
          questionText: row.questionText,
          media: row.mediaType ? { type: row.mediaType, url: row.mediaUrl } : null,
          answers: [],
          userAnswerId: row.userAnswerId || null, // include user's saved selection
        };
        acc[row.blockId] = block;
      }

      if (row.answerText) {
        block.answers.push({
          id: row.answerId,
          text: row.answerText,
          isCorrect: row.isCorrect,
          position: row.answerPosition,
        });
      }
      return acc;
    }, {});

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(Object.values(groupedData));
  } catch (error) {
    console.error('Error fetching knowledge check blocks:', error);
    res.status(500).send('Internal Server Error');
  }
};


const app = express()
const port = 5001

app.use(cors());

app.use(morgan('dev'))
app.use(express.json());

app.get('/knowledge-check-blocks', getKnowledgeCheckBlocks)

// post answer
app.post('/user-answer', async (req: Request, res: Response) => {
  const { blockId, answerId } = req.body;

  try {
    await knex('userAnswers')
      .insert({ blockId, answerId })
      .onConflict('blockId')
      .merge();

    const answer = await knex('answers').where({ id: answerId }).first();
    const isCorrect = answer.isCorrect;

    res.status(200).json({ isCorrect });
  } catch (error) {
    console.error('Error saving user answer:', error);
    res.status(500).json({ error: 'Failed to save user answer.' });
  }
});

// reset answer
app.delete('/reset-answer', async (req, res) => {
  const { blockId } = req.body;

  try {
    await knex('userAnswers').where({ blockId }).del();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error resetting user answer:', error);
    res.status(500).json({ error: 'Failed to reset the answer' });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`))
