import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { IKnowledgeBlock } from '../../types/knowledgeBaseData';
import MediaDisplay from './MediaDisplay';
import AnswerList from './AnswerList';
import FeedbackDisplay from './FeedbackDisplay';

interface KnowledgeCardProps {
  block: IKnowledgeBlock;
  isCorrect: boolean | null;
  onSubmit: (blockId: string, selectedAnswer: string) => void;
  onReset: (blockId: string) => void;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ block, onReset, isCorrect, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(block.userAnswerId || null);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setErrorVisible(false);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setErrorVisible(true);
      return;
    }
    onSubmit(block.blockId, selectedAnswer);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    onReset(block.blockId);
  };

  return (
    <div className="knowledge-card">
      <div className="knowledge-card__content">
        <h3 className="knowledge-card__title">{block.questionText}</h3>

        {block.media && <MediaDisplay media={block.media} />}

        <AnswerList
          answers={block.answers}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          blockId={block.blockId}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="knowledge-card__error">
          {errorVisible && (
            <div className="knowledge-card__error-message">
              <FontAwesomeIcon icon={faCircleInfo} />
              <p>Please answer the question to continue</p>
            </div>
          )}
        </div>

        {isCorrect !== null ? (
          <FeedbackDisplay
            isCorrect={isCorrect}
            feedback={block.feedback}
            onReset={handleReset}
          />
        ) : (
          <div className="knowledge-card__actions">
            <button className="knowledge-card__submit" type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCard;
