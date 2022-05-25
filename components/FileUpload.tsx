import React, { Dispatch, SetStateAction, useRef } from "react";





type Props = {
  setImage: Dispatch<SetStateAction<File>>;
};

const FileUpload: React.FC<Props> = ({ setImage }) => {

  const inputRef = useRef(null);

  

  const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      alert("ファイルがありません。");
      return;
    }
    const img: File = event.target.files[0];
    setImage(img);
  };
  

  return (
    <>
      <input type="file" ref={inputRef} onChange={getImage} />
    </>
  );
};
export default FileUpload;
