import ChatLayout from '@components/common/Chat/ChatLayout/ChatLayout';

const Chat = () => {
  return (
    <ChatLayout page="index">
      {() => (
        <div className="mb-10 hidden h-[48rem] w-full items-center justify-center rounded-2xl border border-grayLineBased bg-background sm:flex sm:min-h-full">
          {/* NO PARTICIPANT SELECTED BOX */}
          <div className="font-worksans max-w-[32rem] text-center text-grayInputField">
            <h2>Message your friends</h2>{' '}
            <p>
              Let’s make a great conversation with your trustworthy friends,
              partners
            </p>
          </div>
        </div>
      )}
    </ChatLayout>
  );
};

// Chat.getLayout = function getLayout(page: ReactElement) {
//   return <ChatLayout>{page}</ChatLayout>;
// };

export default Chat;
