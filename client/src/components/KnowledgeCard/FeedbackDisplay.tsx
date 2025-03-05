import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './KnowledgeCard.scss';

interface FeedbackDisplayProps {
  isCorrect: boolean;
  feedback: string;
  onReset: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ isCorrect, feedback, onReset }) => (
  <div className="knowledge-card__feedback">
    <div className="knowledge-card__feedback-content">
      <div className="knowledge-card__feedback-content-icon">
        <FontAwesomeIcon icon={isCorrect ? faCheck : faXmark} size="2x" />
      </div>
      <p className="knowledge-card__feedback-result">{isCorrect ? 'Correct' : 'Incorrect'}</p>
      <p className="knowledge-card__feedback-text">{feedback}</p>
    </div>
    <button type="button" className="knowledge-card__retake-button" onClick={onReset}>
      Take again
      <FontAwesomeIcon icon={faRotateRight} />
    </button>
  </div>
);

export default FeedbackDisplay;
