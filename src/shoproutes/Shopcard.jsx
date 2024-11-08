const Shopcard = ({ item }) => {
  const { title, description, price, category, image } = item;

  return (
    <div>
      <div className="card border border-gray-300 p-5">
        <figure className="bg-gray-200  rounded-b-xl h-80">
          <img
            src={image}
            alt="image"
            className="rounded-xl h-full w-full object-cover"
          />
        </figure>
        <div className="">
          <h2 className="text-xl font-semibold py-2">{title}</h2>
          <p className="text-base text-black pb-2">{description}</p>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Price: <span className="text-amber-600 font-semibold">{price}</span> TK</h1>
            <button className="btn bg-green-600 hover:bg-green-400 text-black text-base">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopcard;
