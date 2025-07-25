import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="w-44 md:w-48 lg:w-64 h-80 lg:h-80 overflow-hidden border border-neutral relative rounded-sm shadow bg-secondary">
      <section className="relative h-[70%]">
        <Link to={`/product/${p._id}`}>
          <span className="absolute z-30 bottom-3 right-3 bg-accent text-secondary text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md">
            {p?.brand}
          </span>
          <img
            className="w-full h-full object-cover transition-transform ease-in-out duration-500 transform hover:scale-105"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="h-[30%] mt-2 px-2 overflow-hidden">
        <div className="flex justify-between">
          <h5 className="mb-2 text-sm md:text-base text-accent">
            {p?.name.substring(0, 15)}...
          </h5>

          <p className="font-semibold text-primary">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        {/* <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 60)} ...
        </p> */}

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center p-1 lg:px-3 lg:py-2 text-sm font-medium text-secondary bg-primary rounded-sm"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full bg-primary text-secondary hover:bg-accent hover:text-primary transition-colors"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
