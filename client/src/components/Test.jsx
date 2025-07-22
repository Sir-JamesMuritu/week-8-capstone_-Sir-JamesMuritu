import img from "../assets/product3.png";
const Test = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex items-center gap-5">
          <div
            className={`bg-white relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center shadow`}
          >
            <img
              src={img}
              alt={`img`}
              className="w-36 h-auto object-fill lg:w-28"
            />
            <div className="absolute right-1 top-1 blur-theme-effect bg-[#FFB900] text-black text-xs px-1 rounded font-bold border border-black">
              $129
            </div>
          </div>
          <div className="grid items-center gap-4">
            <div className="grid items-center leading-none">
              <h1 className="font-medium text-lg text-black lg:text-sm">
                Nike Addapt BB Rose
              </h1>
              <p className="text-sm text-black lg:text-xs">MEN Running Shoes</p>
            </div>
            <div className="flex items-center justify-around w-full">
              <button
                type="button"
                className="bg-[#FFB900] rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90 text-black font-bold shadow hover:bg-black hover:text-[#FFB900]"
              >
                <span className="w-5 h-5 lg:w-4 lg:h-4">+</span>
              </button>
              <div className="bg-[#FFB900] rounded text-black font-bold lg:text-xs w-7 h-6 lg:h-5 lg:w-6 flex items-center justify-center shadow">
                5
              </div>
              <button
                type="button"
                className="bg-[#FFB900] rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90 text-black font-bold shadow hover:bg-black hover:text-[#FFB900]"
              >
                <span className="w-5 h-5 lg:w-4 lg:h-4">-</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-5">
          <div className="grid items-center justify-center">
            <h1 className="text-lg lg:text-base text-black font-bold">129</h1>
          </div>
          <div className="grid items-center justify-center">
            <button
              type="button"
              className="bg-[#FFB900] rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer text-black font-bold shadow hover:bg-black hover:text-[#FFB900]"
            >
              <span className="w-5 h-5">Del</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Test;
