import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "applicant",
    file: null,
  });

  const [fileName, setFileName] = useState("");

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      file,
    });

    setFileName(file?.name || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(input);

    // API call goes here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-md p-8"
        >
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign up to continue
            </p>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <Label
              htmlFor="fullname"
              className="mb-2 block text-sm font-medium"
            >
              Full Name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              value={input.fullname}
              onChange={changeEventHandler}
              className="h-11"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
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

          {/* Phone */}
          <div className="mb-4">
            <Label
              htmlFor="phoneNumber"
              className="mb-2 block text-sm font-medium"
            >
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
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
          <div className="mb-5">
            <Label className="mb-3 block text-sm font-medium">
              Select Role
            </Label>

            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput({
                  ...input,
                  role: value,
                })
              }
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="applicant" id="applicant" />
                <Label htmlFor="applicant" className="cursor-pointer">
                  Applicant
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Photo */}
          <div className="mb-6">
            <Label className="block mb-3 text-sm font-medium">
              Profile Photo
            </Label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label
                htmlFor="profile-upload"
                className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition"
              >
                Choose File
              </label>

              <Input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={fileChangeHandler}
              />

              <span className="text-sm text-gray-500">
                {fileName || "No file selected"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-black hover:bg-[#F83002] text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
          >
            Sign Up
          </Button>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#F83002] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;