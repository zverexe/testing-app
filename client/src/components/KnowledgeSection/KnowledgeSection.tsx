import React from 'react';
import { useKnowledgeBlocks } from '../../hooks/useKnowledgeBlocks';
import KnowledgeCard from "../KnowledgeCard";
import './KnowledgeSection.scss';

const KnowledgeSection: React.FC = () => {
  const {
    knowledgeBlocks,
    submissionResults,
    loading,
    error,
    handleSubmit,
    handleReset,
  } = useKnowledgeBlocks();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!knowledgeBlocks.length) {
    return <p>No questions available.</p>;
  }

  return (
    <div className="knowledge-block-list">
      {knowledgeBlocks.map((block) => (
        <KnowledgeCard
          key={block.blockId}
          block={block}
          isCorrect={submissionResults[block.blockId]}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
      ))}
    </div>
  );
};

export default KnowledgeSection;
