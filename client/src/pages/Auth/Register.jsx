import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../../redux/api/usersApislice";
import { setCredentials } from "../../redux/features/auth/authSlice";

import Loader from "../../components/Loader";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(`err.data.message || err.message || err`);
      }
    }
  };

  return (
    <section className="px-6 flex justify-around items-center flex-wrap gap-8 w-full text-secondary overflow-hidden bg-accent min-h-[100vh]">
      <div className="text-neutral">
        {/* <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold mb-4 text-[#F6F6F6]">
          Register
        </h1> */}
        <h1 className="text-lg md:text-2xl 2xl:text-2xl font-medium mb-2 mt-[5%]">
          Welcome to HeavenLuxury! 👋🏻
        </h1>

        <form
          onSubmit={submitHandler}
          className="container w-[21rem] md:w-[33rem] 2xl:w-[36rem]"
        >
          <div className="">
            <label
              htmlFor="name"
              className="flex items-center gap-3 text-lg font-medium mb-2 "
            >
              <AiOutlineUserAdd size={26} className="text-primary" /> Username
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded  w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-accent placeholder-neutral  text-secondary outline-none border-neutral focus:border-primary"
              placeholder="John Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="">
            <label
              htmlFor="email"
              className="flex items-center gap-3 text-lg font-medium mb-2 "
            >
              <HiOutlineMail size={26} className="text-primary" />
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded  w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-accent placeholder-neutral  text-secondary outline-none border-neutral focus:border-primary"
              placeholder="jhon.doe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="flex items-center gap-3 text-lg font-medium mb-2 "
            >
              <RiLockPasswordLine size={26} className="text-primary" />
              Password
            </label>
            <input
              type={isVisiblePass ? "text" : "password"}
              id="password"
              className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-accent placeholder-neutral  text-secondary outline-none border-neutral focus:border-primary"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-8 top-12 md:bottom-0 md:right-24 cursor-pointer"
              onClick={() => setIsVisiblePass(!isVisiblePass)}
            >
              {isVisiblePass ? <BiShowAlt size={20} /> : <BiHide size={20} />}
            </span>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="flex items-center gap-3 text-lg font-medium mb-2 "
            >
              <RiLockPasswordLine size={26} className="text-primary" />
              Confirm Password
            </label>
            <input
              type={isVisiblePass ? "text" : "password"}
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-accent placeholder-neutral  text-secondary outline-none border-neutral focus:border-primary"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-8 top-12 md:bottom-0 md:right-24 cursor-pointer"
              onClick={() => setIsVisiblePass(!isVisiblePass)}
            >
              {isVisiblePass ? <BiShowAlt size={20} /> : <BiHide size={20} />}
            </span>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-primary hover:bg-neutral transition-colors text-secondary border-none outline-none w-[320px] md:w-[460px] 2xl:w-[520px] px-4 py-2 rounded cursor-pointer text-base font-semibold"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-2">
          <p className="text-lg">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-primary hover:underline shadow-2xl shadow-secondary"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Register;
