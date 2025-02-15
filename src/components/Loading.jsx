import PuffLoader from 'react-spinners/PuffLoader'

const Loading = () => {
  return (
    <div className="">
      <PuffLoader color="#00bc46" loading={true} size={100} />
    </div>
  );
};

export default Loading;
