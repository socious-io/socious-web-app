import ChatLayout from '@components/common/Chat/ChatLayout/ChatLayout';
import {GeneralLayout} from 'layout';
const Chat = () => {
  return (
    <GeneralLayout>
      <ChatLayout page="index">
        {() => (
          <div className="mb-10 hidden h-[48rem] w-full items-center justify-center rounded-2xl border border-grayLineBased bg-background sm:flex">
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
    </GeneralLayout>
  );
};

// Chat.getLayout = function getLayout(page: ReactElement) {
//   return <ChatLayout>{page}</ChatLayout>;
// };

export default Chat;
