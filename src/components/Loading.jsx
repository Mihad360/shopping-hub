import PuffLoader from 'react-spinners/PuffLoader'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <PuffLoader color="#00bc46" size={100} />
    </div>
  );
};

export default Loading;
