const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Add Category",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="mt-1 p-2 border rounded w-[90%] bg-white placeholder-gray-400 text-black outline-none border-[#FFB900] focus:border-black shadow"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between gap-4">
          <button className="bg-[#FFB900] hover:bg-black transition-colors text-black hover:text-[#FFB900] border-none outline-none md:w-[180px] px-4 py-2 cursor-pointer my-[1rem] text-base font-bold rounded shadow">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-[#FFB900] hover:bg-black transition-colors text-black hover:text-[#FFB900] border-none outline-none md:w-[180px] px-4 py-2 cursor-pointer my-[1rem] text-base font-bold rounded shadow"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
