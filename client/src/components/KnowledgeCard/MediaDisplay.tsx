import React from 'react';
import { IMedia } from '../../types/knowledgeBaseData';
import './KnowledgeCard.scss';

interface MediaDisplayProps {
  media: IMedia;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ media }) => {
  if (media.type === 'image') {
    return <img src={media.url} alt="Question media" className="knowledge-card__media" />;
  }

  // if not an image - consider here to return something else
  //return ();
};

export default MediaDisplay;
