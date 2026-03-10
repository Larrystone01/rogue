"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSignIn(e: any) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter all the field");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // const user = userCredentials.user;
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        Cookies.set("token", token);
      }

      router.push("/sign-in");
      toast.success("ALogin Successful");
      setFormData({ email: "", password: "" });
    } catch (err: any) {
      setError(err.message);
      toast.error("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        Cookies.set("token", token);
      }
      toast.success("Login suceesful");
      router.push("/cart");
      const user = result.user;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            onSubmit={handleSignIn}
          >
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
              login
            </button>
            <div className="or-line md:w-125">
              <p className="or w-full uppercase">or</p>
            </div>
            <div className="sign-up-with-google">
              <button
                className="uppercase flex items-center justify-center gap-2 bg-white border border-gray-500 py-3 md:w-125 w-full cursor-pointer"
                onClick={handleGoogleSignIn}
              >
                login with google{" "}
                <span>
                  <FcGoogle />
                </span>
              </button>
            </div>
          </form>
          <div className="input-foot md:w-125 text-center mt-8">
            <p className="text-[0.9rem] text-gray-500">
              No account?{" "}
              <span className="text-black">
                <Link href="/sign-up">Create one</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
