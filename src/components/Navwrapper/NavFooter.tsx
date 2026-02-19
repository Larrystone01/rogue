import Navbar from "./Navbar";
import Footer from "./Footer";

type NavwrapperProps = {
  children: React.ReactNode;
};

export default function Navwrapper({ children }: NavwrapperProps) {
  return (
    <>
      <Navbar />
      <main className="pt-17.5">{children}</main>
      <Footer />
    </>
  );
}
