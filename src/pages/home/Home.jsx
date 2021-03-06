import React from "react";
import Chat from "../../components/chat";
import LeftNavBar from "../../components/left-side-nav";
import NavBar from "../../components/navigation";
import InfoSidebar from "../../components/InfoSidebar";
import DrawerProfile from "../../components/profile/DrawerProfile";
export default function Home() {
  return (
    <div>
      <DrawerProfile />
      <LeftNavBar />
      <NavBar />
      <InfoSidebar />
      <Chat />
    </div>
  );
}
