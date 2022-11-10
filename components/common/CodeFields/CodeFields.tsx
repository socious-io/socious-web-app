import React, {useEffect, useRef, useState} from 'react';
import TextInput from '../TextInput/TextInput';

type CodeFieldsProps = {
  setBlock?: (state: boolean) => void;
  sendCode: (code: string) => void;
};

const CodeFields = ({setBlock, sendCode}: CodeFieldsProps) => {
  const codeInputRef: any = useRef(null);
  const [code, setCode] = useState<any>([null, null, null, null, null, null]);

  useEffect(() => {
    setBlock && setBlock(code.includes(null) || code.includes(''));
  }, [setBlock, code]);

  useEffect(() => {
    sendCode(code?.join(''));
  }, [code, sendCode]);

  const handleCodeInputChange = (e: any, codeIndex: number) => {
    setCode(
      code?.map((codeItem: any, indexCodeItem: number) =>
        indexCodeItem === codeIndex
          ? e.target.value !== ''
            ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
            : null
          : code[indexCodeItem],
      ),
    );

    codeIndex !== 5 &&
      e.target.value !== '' &&
      codeInputRef.current.children[codeIndex + 1].children[0].select();
  };
  return (
    <div
      className="codes mx-auto flex justify-between space-x-2 pt-10 pb-5 md:space-x-3"
      ref={codeInputRef}
    >
      {[0, 1, 2, 3, 4, 5].map((codeIndex) => (
        <TextInput
          key={`opt-code-${codeIndex}`}
          value={code[codeIndex]}
          onChange={(e) => handleCodeInputChange(e, codeIndex)}
          type="number"
          maxLength={1}
          className="max-w-16 aspect-square border-2 border-grayLineBased text-center"
        />
      ))}
    </div>
  );
};

export default CodeFields;
