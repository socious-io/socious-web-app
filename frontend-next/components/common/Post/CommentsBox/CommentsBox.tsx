import { useEffect, useState, useRef, useCallback } from 'react';
import CommentItem from 'layout/screen/CommentItem/CommentItem';
import useSWR from 'swr';
import { get } from 'utils/request';
import { useSWRConfig } from 'swr';

const CommentsBox = ({pid, page}: {pid: string, page: number}) => {
  // const comments =[
  //     {
  //       content: "Hello How are youes",
  //       name: "My Name"
  //     },
  //     {
  //       content: "Good Work.",
  //       name: "Another Name"
  //     },
  //     {
  //       content: "Amazing. I believe it.",
  //       name: "Name Name"
  //     }
  //   ]


  const { mutate } = useSWRConfig();
  // Uncomment When Create Comment done.
  const { data: comments, error } = useSWR<any>((pid && page) ? `/api/v2/posts/${pid}/comments?page=${page}` : null, get)

  if (!comments?.items) {
    <> ERROR </>
  }
  const mutateComments = useCallback(() => {
    console.log("I should be mutating those comments");
    mutate(`/api/v2/posts/${pid}/comments?page=${page}`);
  }, [mutate, page, pid])


  return (
    <>
      {
        comments?.items?.map((comment: any) => (
        // comments?.map((comment: any) => (
          <CommentItem
            className=" border-[#C3C8D9] border-b-[0.5px]"
            id={comment?.id}
            post_id={comment?.post_id}
            name={comment?.identity_meta?.name}
            content={comment?.content}
            liked={comment?.liked}
            likes={comment?.likes}
            time={comment?.created_at}
            mutateComments={mutateComments}
            key={comment.id ?? comment.name}
          />
        ))
      }
    </>
  );
};

export default CommentsBox;