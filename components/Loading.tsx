const Loading: React.FC = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="animate-spin h-12 w-12 bg-indigo-500 rounded-xl mb-10 mt-10"></div>
      </div>
      <span className="text-gray-800 text-3xl font-bold text-center mb-4" >
        Webスクレイピング中.....
      </span>
    </>
  );
};
export default Loading;
