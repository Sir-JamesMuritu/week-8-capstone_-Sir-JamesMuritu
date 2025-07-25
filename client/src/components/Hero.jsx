import { Link } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";

// import ContentWrapper from "./components/ContentWrapper";
const Hero = () => {
  return (
    <div className="bg-[#FFB900]">
      <ContentWrapper>
        <div className="h-[520px] w-full flex justify-center py-8">
          <div className="w-[70%] pt-[4%] flex items-center md:text-center flex-col">
            <h4 className="text-black border border-black border-spacing-[1rem] text-sm md:text-xl border-dotted px-4 py-1 w-fit my-4 font-bold rounded-lg bg-white shadow-md">
              HeavenLuxury: Where Shopping Meets Elegance, Seamlessly.{" "}
              <Link
                to={"/shop"}
                className="text-[#FFB900] hidden md:inline-block md:text-xl pl-2 font-bold"
              >
                Shop
              </Link>
            </h4>
            <h2 className="text-black text-base md:text-5xl font-extrabold leading-10 border-dotted px-0 md:px-4 py-1 w-fit md:mt-6 rounded-lg bg-white shadow-lg">
              Seamless. Secure. Simply Luxe.
            </h2>
            <p className="text-[#333] md:mt-4 text-lg font-medium bg-white bg-opacity-80 p-4 rounded-xl shadow">
              Discover HeavenLuxury, where shopping feels like a breeze.
              Effortlessly browse our curated selection, enjoy swift and secure
              transactions, and revel in a 20% boost in satisfaction. HeavenLuxury:
              Elevating your online shopping game with style and ease!
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
export default Hero;
