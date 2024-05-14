 import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginReq } from "../../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import ButtonLoader from "../../components/ButtonLoader";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

import { Checkbox } from "@chakra-ui/react";

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/");
    }
  }, [isAuthenticated]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    function validateEmail(email) {
      return emailRegex.test(email);
    }

    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        position: "top",
        text: "Invalid Email!",
        timer: 5000,
      });
      return;
    }

    if (email == "") {
      Swal.fire({
        icon: "error",
        position: "top",
        text: "Email could not be empty!",
        timer: 5000,
      });
      return;
    }
    if (password == "") {
      Swal.fire({
        icon: "error",
        position: "top",
        text: "Please enter password!",
        timer: 5000,
      });
      return;
    }

    setLoader(true);

    await LoginReq(email, password)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.userId);
          navigate("/dashboard/");
        } else {
          setLoader(false);
          console.log(res)
          Swal.fire({
            icon: "error",
            position: "top",
            text: res.msg ? res.msg : "Invalid Credentials",
            timer: 5000,
          });
        }
      })
      .catch((e) => {
        setLoader(false);
        alert(e);
        console.log(e);
      });
  };

  return (
    <>
      <div className="bg-[#FFF5F0]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center items-center bg-[#FFF5F0] h-[100vh]">
            <div className="flex md:w-[90%] lg:w-[70%] sm:w-[95%] w-full login-form">
              <div className="first-box w-[50%] hidden sm:flex flex-col justify-center items-center">
                <div className="hidden sm:block">
                  <img src={logo} alt="Multi Point Inspect" />
                </div>
                <div className="pl-7">
                  <h1 className="font-[750] text-center text-black xl:text-6xl text-4xl">
                    Welcome <br />
                    Back!
                  </h1>
                </div>
              </div>
              <div className="second-box w-[100%] h-[100vh] sm:h-auto sm:w-[50%] py-14 justify-center items-center flex">
                <div className="w-[100%] px-6 sm:px-8 md:px-14">
                  <div className="flex flex-col gap-5 pb-10 text-center sm:text-start">
                    <div className="sm:hidden flex justify-center ">
                      <img
                        className="w-[150px]"
                        src={logo}
                        alt=""
                      />
                    </div>
                    <div className="text-3xl font-bold hidden sm:block">Login</div>
                    <div className="text-sm text-slate-400">
                      Welcome back! Please login to your account
                    </div>
                  </div>
                  <div>
                    <div className="py-2">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-slate-400 "
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      />
                    </div>
                    <div className="py-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-slate-400 "
                      >
                        Password
                      </label>
                      <InputGroup size="md">
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          focusBorderColor={"black"}
                          px={2.5}
                          onFocus={() => setShowPasswordValidation(true)}
                          onBlur={() => setShowPasswordValidation(false)}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <IoMdEye /> : <IoMdEyeOff />}
                          </Button>
                        </InputRightElement>
                        <p></p>
                      </InputGroup>
                    </div>
                    <div className="flex justify-between text-sm py-4">
                      <div className="flex justify-center items-center">
                        {" "}
                        <Checkbox colorScheme="orange" />
                        <span className="mx-2 font-semibold text-sm">
                          Remember me
                        </span>
                      </div>
                      {/* <div className="text-slate-400">Forgot Password?</div> */}
                    </div>
                    <button
                      onClick={handleSubmit}
                      className={`w-full sm:w-full py-2 rounded-lg bg-[#FA6500] text-slate-50 my-4 flex items-center justify-center  cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-lg hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:to-[#00C5E7)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0`}
                    >
                      {loader ? <ButtonLoader /> : "Login"}
                    </button>
                  </div>
                  <div className="text-sm text-slate-400 mt-10 flex justify-center sm:justify-start font-semibold">
                    New user? &nbsp;{" "}
                    <span className="text-[#FA6500] ">
                      {" "}
                      <Link to={"/signup"}> Signup</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
