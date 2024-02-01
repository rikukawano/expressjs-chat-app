import React from "react";
import Sidebar from "../components/Sidebar";
import TextInput from "../components/TextInput";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex-col overflow-auto lg:pl-72">
        <div className="h-full flex flex-col justify-end px-4 pb-4">
          <TextInput />
        </div>
      </div>
    </div>
  );
};

export default Home;
