import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "applicant",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(input);

    // Login API call here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-8"
        >
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Login to continue</p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHandler}
              className="h-11"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <Label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </Label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={changeEventHandler}
              className="h-11"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <Label className="mb-3 block text-sm font-medium">Login As</Label>

            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  role: value,
                }))
              }
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="applicant" id="applicant" />
                <Label htmlFor="applicant">Applicant</Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-black hover:bg-[#F83002] text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </Button>

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-600 mt-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#F83002] font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
