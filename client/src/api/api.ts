import { IKnowledgeBlock } from '../types/knowledgeBaseData';

/**
 * Fetch knowledge blocks from the backend.
 */
export const fetchKnowledgeBlocks = async (): Promise<IKnowledgeBlock[]> => {
  const response = await fetch('http://localhost:5001/knowledge-check-blocks');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

/**
 * Submit a user's answer to the backend.
 * @param blockId The ID of the knowledge block.
 * @param selectedAnswer The selected answer's ID.
 */
export const submitAnswer = async (
  blockId: string,
  selectedAnswer: string
): Promise<{ isCorrect: boolean }> => {
  const response = await fetch('http://localhost:5001/user-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blockId, answerId: selectedAnswer }),
  });

  if (!response.ok) {
    throw new Error('Failed to save the answer');
  }

  return response.json();
};

/**
 * Reset a user's answer for a specific block.
 * @param blockId The ID of the knowledge block.
 */
export const resetAnswer = async (blockId: string): Promise<void> => {
  const response = await fetch('http://localhost:5001/reset-answer', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blockId }),
  });

  if (!response.ok) {
    throw new Error('Failed to reset the answer');
  }
};
