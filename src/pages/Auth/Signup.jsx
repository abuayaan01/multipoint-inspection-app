import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { RegisterReq } from "../../services/api";
import { motion } from "framer-motion";
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import ButtonLoader from "../../components/ButtonLoader";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const Register = async (e) => {
    console.log("first");
    e.preventDefault();
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

    function validateEmail(email) {
      return emailRegex.test(email);
    }

    function validatePassword(password) {
      return passwordRegex.test(password);
    }

    if (email == "" || firstName == "" || lastName == "" || password == "") {
      Swal.fire({
        icon: "error",
        position: "top-end",
        text: "Please enter all fields.",
        toast: true,
        timer: 5000,
        showConfirmButton: false,
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        position: "top-end",
        text: "Please enter a valid email.",
        toast: true,
        timer: 5000,
        showConfirmButton: false,
      });
      return;
    }
    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        position: "top-end",
        text: "Invalid password format.",
        timer: 5000,
        toast: true,
        showConfirmButton: false,
      });
      return;
    }

    setLoader(true);

    await RegisterReq(firstName, lastName, email, password)
      .then((res) => {
        setLoader(false);
        console.log(res);
        const resMsg = res.msg;
        const status = res.status != 200 ? "error" : "success";
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: `${status}`,
            position: "top",
            text: `${resMsg}`,
            timer: 2000,
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: `${status}`,
            position: "top",
            text: res.error,
            timer: 2000,
          });
        }
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  return (
    <>
      <div className="bg-[#FFF5F0]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, height: "auto" }}
          animate={{ scale: 1, opacity: 1, height: showPasswordValidation ? "auto" : "auto" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center items-center bg-[#FFF5F0] h-[100vh] ">
            <div className="flex md:w-[90%] lg:w-[70%] sm:w-[95%] w-full login-form">
              <div className="first-box px-8 w-[50%] hidden sm:flex justify-center items-center flex-col">
                <div className="hidden sm:block">
                  <img src={logo} alt="" />
                </div>
                <div className="pl-7">
                  <p className="font-[750] text-center text-black xl:text-6xl text-4xl">
                    Register & Explore!
                  </p>
                </div>
              </div>
              <div className="second-box w-[100%] h-[100vh] sm:h-auto sm:w-[50%] py-14 justify-center items-center flex">
                <div className="w-[100%] px-6 sm:px-8 md:px-14">
                  <div className="flex flex-col gap-5 pb-10 text-center sm:text-start">
                    <div className="sm:hidden flex justify-center ">
                      <img className="w-[150px]" src={logo} alt="" />
                    </div>
                    <div className="text-3xl font-bold hidden sm:block">
                      Signup
                    </div>
                    <div className="text-sm text-slate-400">
                      Enter your details to create an account
                    </div>
                  </div>
                  <div className="">
                    <div className="flex pb-3 gap-2 ">
                      <div className="w-[50%]">
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm font-medium text-slate-400 "
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                      </div>
                      <div className="w-[50%]">
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-slate-400 "
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
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
                     {showPasswordValidation && <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-slate-500 my-2"
                      >
                        Password must be : <br />
                        ▪ 8 characters or longer <br />
                        ▪ At least one uppercase letter, one lowercase letter{" "}
                        <br />▪ One digit, and one special character.
                      </motion.p>}
                    </div>
                    <div className="flex justify-between text-sm py-3"></div>
                    <button
                      onClick={Register}
                      className={`w-full sm:w-full py-2 rounded-lg bg-[#FA6500] text-slate-50 my-1 flex items-center justify-center  cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:to-[#00C5E7)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0`}
                    >
                      {loader ? <ButtonLoader /> : "Register"}
                    </button>
                  </div>
                  <div className="text-sm text-slate-400 mt-10 flex justify-center sm:justify-start font-semibold">
                    Already have an account? &nbsp;{" "}
                    <span className="text-[#FA6500] ">
                      {" "}
                      <Link to={"/"}> Login</Link>
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

export default Signup;
