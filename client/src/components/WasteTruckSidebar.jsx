import React from "react";
import { Sidebar } from "flowbite-react";
import logo from '../images/logo.png';
import { HiDocumentReport, HiChartPie, HiInbox, HiQrcode, HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

const WasteTruckSidebar = () => {
  return (
    <Sidebar aria-label="" className="m-10">
      <Sidebar.Logo href="#" img={logo} imgAlt="*greenbin logo">
        Green Bin
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/truck/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/truck/requests" icon={HiInbox}>
            Requests
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/truck/qrcode" icon={HiQrcode}>
            QR code scanner
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/" icon={HiLogout} className="mt-[19rem]">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default WasteTruckSidebar;
