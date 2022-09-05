import { useState } from 'react';
import AddPost from './AddPost';
import Posts from './Posts';
import { Modal, Button } from "@components/common"
import { useToggle } from '@hooks';
import {TextArea, Avatar} from '@components/common';
import Combobox from '@components/common/Combobox/Combobox';

const MainContent = () => {
  const {state: addPostState, handlers: addPostHandlers} = useToggle();
  const {state: likeState, handlers: likeHandlers} = useToggle();
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="w-full mb-10 space-y-6">
      <AddPost onClickAdd={addPostHandlers.on}/>
      <Posts />
      {/* Like Modal */}
      <Modal isOpen={likeState} onClose={likeHandlers.off}>
        <Modal.Title>
          <h2 className="text-center">Likes</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2 h-80 overflow-y-auto mt-8">
            <div className='flex justify-between border-t-2 py-3'>
              <div className='flex items-center'>
                <Avatar />
                Clear Me
              </div>
              <Button size='sm'>
                Connect
              </Button>
            </div>
            <div className='flex justify-between border-t-2 py-3'>
              <div className='flex items-center'>
                <Avatar />
                Clear Me
              </div>
              <Button size='sm'>
                Connect
              </Button>
            </div>
          </div>
        </Modal.Description>
      </Modal>

      {/* Add Post Modal */}
      <Modal isOpen={addPostState} onClose={addPostHandlers.off}>
        <Modal.Title>
          <h2 className="text-center">Start Post</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2 space-y-8">
            <Combobox 
              selected={selected}
              onSelected={setSelected}
              items={[
                {id: 1, name: "Enviroment"},
                {id: 2, name: "Child Right"},
                {id: 3, name: "Human Right"},
                {id: 4, name: "Animal Right"},
                ]}
            />
            <TextArea
              placeholder='I feel like......'
              rows={10}
            />
          </div>
        </Modal.Description>
        <div className="mt-4">
          <Button
            className="max-w-xs ml-auto flex items-center justify-center align-middle mt-4 "
            type="submit"
            // size="lg"
            variant="fill"
            value="Submit"
            onClick={() => alert("Post successfully created")}
          >
            Create Post
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MainContent;