import React from "react";
import { Sidebar } from "flowbite-react";
import logo from '../images/logo.png';
import { HiDocumentReport, HiChartPie, HiInbox, HiUser, HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <Sidebar aria-label="" className="m-10 h-[40rem]">
      <Sidebar.Logo href="#" img={logo} imgAlt="*greenbin logo">
        Green Bin
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/admin/dashboard/content" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/requests" icon={HiInbox} label="3">
            Requests
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/reports" icon={HiDocumentReport}>
            Reports
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/" icon={HiLogout} className="mt-[19rem]">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default AdminSidebar;
