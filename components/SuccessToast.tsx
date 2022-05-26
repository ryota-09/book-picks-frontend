import { Dispatch, SetStateAction } from "react";

type Props = {
  canShow: boolean;
  setCanShow: Dispatch<SetStateAction<boolean>>;
  displayText: string;
};

const SuccessToast: React.FC<Props> = ({
  canShow,
  setCanShow,
  displayText,
}) => {
  return (
    <>
      <div
        className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm"
      >
        <input type="checkbox" className="hidden" id="footertoast" />

        <label
          className="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-10 rounded shadow-lg text-white"
          title="close"
          htmlFor="footertoast"
        >
          <span className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            &nbsp;{displayText}
          </span>
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </label>
      </div>
    </>
  );
};
export default SuccessToast;
