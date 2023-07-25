import React from "react";
import startup from "../assets/images/start.svg";
import payout from "../assets/images/payout.svg";
import Links from "./Links/Links";
import ProgressBar from "./ProgressBar";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className=" mt-12">
      <h1>{title}</h1>
      <Links />
    </div>
  );
};

export default Header;
