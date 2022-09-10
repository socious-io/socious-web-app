import PostContent from './components/PostContent';
import PostHead from './components/PostHead';
import React from 'react';
// import CommentItem from '../CommentItem/CommentItem';
import { PostCardProps } from './PostCard';

const CommentedCard = ({content, name, time, passion}: PostCardProps) => {
  return (
    <div className="border-neutralGray border-b">
      <div className="space-y-5 py-4">
        <PostHead name={(name || "name") + " commented" }/>
        {/* Image container */}
        <PostContent /> 
      </div>
      {/* <CommentItem name={(name || "name")}/> */}
    </div>
  );
};

export default CommentedCard;