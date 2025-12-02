"use client";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"; // ✅ FIXED

const { Sider, Content } = Layout;

export default function LayoutWrapper({ children }) {
  const { theme } = useContext(AppContext);

  const menuItems = [
    {
      key: "dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "employees",
      label: <Link href="/employees">Employees</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme={theme} width={220}>
        <Menu theme={theme} mode="inline" items={menuItems} />
      </Sider>

      <Layout>
        <Content style={{ padding: "24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
