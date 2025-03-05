import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { IAnswer } from '../../types/knowledgeBaseData';
import './KnowledgeCard.scss';

interface AnswerListProps {
  answers: IAnswer[];
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  blockId: string;
  onAnswerSelect: (answerId: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({
 answers,
 selectedAnswer,
 isCorrect,
 blockId,
 onAnswerSelect,
}) => (
  <ul className="knowledge-card__questions">
    {answers.map((answer) => (
      <li
        key={answer.id}
        className={`knowledge-card__answer ${
        isCorrect !== null && selectedAnswer === answer.id ? 'selected' : ''
      }`}
    >
      <label className="knowledge-card__label">
        {isCorrect !== null ? (
          <FontAwesomeIcon icon={answer.isCorrect ? faCircleCheck : faCircleXmark} size="xl" />
        ) : (
          <>
            <input
              type="radio"
              name={`answer-${blockId}`}
              checked={selectedAnswer === answer.id}
              onChange={() => onAnswerSelect(answer.id)}
              disabled={isCorrect !== null}
            />
            <div className="knowledge-card__radio"></div>
          </>
        )}
        <p className="knowledge-card__text">{answer.text}</p>
      </label>
    </li>
    ))}
  </ul>
);

export default AnswerList;
