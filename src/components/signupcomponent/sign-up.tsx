"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
export default function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSignUp(e: any) {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredentials.user;
      await updateProfile(user, { displayName: formData.fullname });
      console.log("user created:", userCredentials);
      // router.push("/sign-in");
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleGoogleSignUp(e: any) {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (err: any) {
      setError(err.message);
    }
  }
  return (
    <section className="my-5">
      <div className="container mx-auto px-6">
        <div className="page-container flex flex-col items-center">
          <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light capitalize">
            create account
          </h1>
          <p className="description capitalize text-[0.9rem] text-gray-500 mb-7">
            join rogue
          </p>
          <form
            className="input-form flex flex-col md:items-center space-y-5 md:max-w-3xl w-full"
            onSubmit={handleSignUp}
          >
            <div className="name-input flex flex-col space-y-3">
              <label htmlFor="fullname" className="capitalize">
                Name
              </label>
              <input
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                name="fullname"
                id="fullname"
                className="p-3 outline-none border border-gray-500 md:w-125 w-full"
                placeholder="Your name"
              />
            </div>
            <div className="email-input flex flex-col space-y-3">
              <label htmlFor="email" className="capitalize">
                email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                id="email"
                className="p-3 outline-none border border-gray-500 md:w-125"
                placeholder="you@example.com"
              />
            </div>
            <div className="password-input flex flex-col space-y-3">
              <label htmlFor="password" className="capitalize">
                password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                id="password"
                className="p-3 outline-none border border-gray-500 md:w-125"
                placeholder="*******"
              />
            </div>
            <button
              type="submit"
              className="uppercase bg-black text-white py-3 md:w-125 cursor-pointer"
            >
              create account
            </button>
            <div className="or-line md:w-125">
              <p className="or w-full uppercase">or</p>
            </div>
            <div className="sign-up-with-google">
              <button
                className="uppercase flex items-center justify-center gap-2 bg-white border border-gray-500 py-3 md:w-125 w-full cursor-pointer"
                onClick={handleGoogleSignUp}
              >
                sign up with google{" "}
                <span>
                  <FcGoogle />
                </span>
              </button>
            </div>
          </form>
          <div className="input-foot md:w-125 text-center mt-8">
            <p className="text-[0.9rem] text-gray-500">
              Already have an account?{" "}
              <span className="text-black">
                <Link href="/sign-in">Sign In</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
