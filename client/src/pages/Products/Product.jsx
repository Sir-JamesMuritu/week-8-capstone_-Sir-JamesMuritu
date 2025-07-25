import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-44 md:w-48 lg:w-64 h-72 lg:h-80 overflow-hidden rounded-sm hover:shadow-lg border border-neutral bg-secondary pb-2">
      <div className="relative h-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform ease-in-out duration-500 transform hover:scale-105"
        />
        <HeartIcon product={product} />
      </div>

      <div className="h-[25%] mt-2 px-2 overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between flex-col">
            <h4 className="text-sm lg:text-base hover:text-primary text-accent">
              {product.name.substring(0, 30)}...
            </h4>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-bold flex gap-2 text-primary">
                ${product.price}
                <s className="opacity-70 font-medium text-neutral">$ {product.price * 2}</s>
                <p className="text-green-600"> (50% off)</p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Product;
