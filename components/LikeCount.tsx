import axios from "axios";
import { useState } from "react";

type PropsType = {
  collectionId: number;
  likeCount: number;
};

const LikeCount: React.FC<PropsType> = ({ collectionId, likeCount }) => {
  const [targetCount, setTargetCount] = useState(likeCount);
  const [toggleStar, setToggleStar] = useState(false);

  const countUp = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3001/db/likeCount/up",
        {
          collectionId: collectionId,
          likeCount: targetCount,
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setTargetCount(response.data.likeCount);
        setToggleStar(true);
      }
    } catch {
      alert("エラーが発生しました。");
    }
  };

  const countDown = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3001/db/likeCount/down",
        {
          collectionId: collectionId,
          likeCount: targetCount,
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setTargetCount(response.data.likeCount);
        setToggleStar(false);
      }
    } catch {
      alert("エラーが発生しました。");
    }
  };

  const onClickStar = () => {
    if (toggleStar === false) {
      countUp();
    } else {
      countDown();
    }
  };

  return (
    <>
      <div className="flex" onClick={onClickStar}>
        {toggleStar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-5"
            viewBox="0 0 20 20"
            fill="#fbc531"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )}
        <span className="font-semibold mb-2">&nbsp;{targetCount}</span>
      </div>
    </>
  );
};
export default LikeCount;
