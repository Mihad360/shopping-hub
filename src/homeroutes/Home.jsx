import Homebanner from "./Homebanner";

const Home = () => {
  const slides = [
    "https://i.ibb.co.com/87C4LNs/4951255.jpg",
    "https://i.ibb.co.com/cL9KHYf/4406846.jpg",
    "https://i.ibb.co.com/NZqh0GC/5495773.jpg",
    "https://i.ibb.co.com/znFY25h/9707792.jpg",
  ];

  return (
    <div>
      <div className="pt-[66px]">
        <Homebanner slides={slides}></Homebanner>
      </div>
    </div>
  );
};

export default Home;
