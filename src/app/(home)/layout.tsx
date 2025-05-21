import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 bg-[#f4f4f0]">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
