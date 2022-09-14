import { NextPage } from "next";
import React, { useEffect } from "react";
import useSWR from "swr";
import { get } from "utils/request";
import SideBar from "@components/common/Home/SideBar";
import MainContent from "@components/common/Home/MainContent";
import StartScreen from "@components/common/StartScreen/StartScreen";
import useUser from "hooks/useUser/useUser";
import IdealScreen from "layout/IdealScreen/IdealScreen";

const Index: NextPage = () => {
  const { user, userError } = useUser();

  if (!userError && !user) {
    return <IdealScreen />;
  }

  if (userError?.response?.status === 401) {
    return <StartScreen />;
  }

  return (
    <div className="mt-10 flex space-x-6">
      <SideBar />
      <MainContent />
    </div>
  );
};

export default Index;
