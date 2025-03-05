import { useState, useCallback, useEffect } from 'react';
import { IKnowledgeBlock } from '../types/knowledgeBaseData';
import { fetchKnowledgeBlocks, resetAnswer, submitAnswer } from '../api/api';

export const useKnowledgeBlocks = () => {
  const [knowledgeBlocks, setKnowledgeBlocks] = useState<IKnowledgeBlock[]>([]);
  const [submissionResults, setSubmissionResults] = useState<{ [blockId: string]: boolean | null }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadKnowledgeBlocks = async () => {
      try {
        const data = await fetchKnowledgeBlocks();
        setKnowledgeBlocks(data);

        const initialResults = data.reduce((acc: { [key: string]: boolean | null }, block: IKnowledgeBlock) => {
          if (block.userAnswerId) {
            const selectedAnswer = block.answers.find((answer) => answer.id === block.userAnswerId);
            acc[block.blockId] = selectedAnswer?.isCorrect || false;
          } else {
            acc[block.blockId] = null;
          }
          return acc;
        }, {});
        setSubmissionResults(initialResults);
      } catch (error) {
        setError('Failed to load knowledge blocks');
        console.error('Error fetching knowledge blocks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadKnowledgeBlocks();
  }, []);

  const handleSubmit = useCallback(async (blockId: string, selectedAnswer: string) => {
    try {
      const { isCorrect } = await submitAnswer(blockId, selectedAnswer);
      setSubmissionResults((prev) => ({
        ...prev,
        [blockId]: isCorrect,
      }));
    } catch (error) {
      console.error('Error saving user answer:', error);
      throw error;
    }
  }, []);

  const handleReset = useCallback(async (blockId: string) => {
    try {
      await resetAnswer(blockId);
      setSubmissionResults((prev) => ({
        ...prev,
        [blockId]: null,
      }));
    } catch (error) {
      console.error('Error resetting user answer:', error);
      throw error;
    }
  }, []);

  return {
    knowledgeBlocks,
    submissionResults,
    loading,
    error,
    handleSubmit,
    handleReset,
  };
};
