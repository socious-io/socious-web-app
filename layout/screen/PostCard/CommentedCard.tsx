// import PostContent from './components/PostContent';
import PostHead from './components/PostHead';
import React from 'react';
// import CommentItem from '../CommentItem/CommentItem';
import {PostCardProps} from './PostCard';

const CommentedCard = ({id, content, name, time, passion}: PostCardProps) => {
  return (
    <div className="border-b border-neutralGray">
      <div className="space-y-5 py-4">
        <PostHead name={(name || 'name') + ' commented'} />
        {/* Image container */}
      </div>
      {/* <CommentItem name={(name || "name")}/> */}
    </div>
  );
};

export default CommentedCard;
