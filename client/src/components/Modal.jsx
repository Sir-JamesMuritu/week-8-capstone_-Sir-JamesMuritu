const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg z-10 text-center shadow-lg border-2 border-[#FFB900]">
            <button
              className="text-black text-2xl font-bold hover:text-[#FFB900] focus:outline-none mr-2 flex float-right bg-[#FFB900] rounded-full w-8 h-8 items-center justify-center shadow"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
