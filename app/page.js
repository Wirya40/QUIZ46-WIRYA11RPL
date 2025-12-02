"use client";

import { Row, Col, Card } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";

// Dashboard Card Component
function DashboardCard({ title, value, icon }) {
  return (
    <Card className="shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-3xl text-blue-600">{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="text-xl font-bold">{value}</h2>
        </div>
      </div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <DashboardCard
            title="Total Employees"
            value="120"
            icon={<UserOutlined />}
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <DashboardCard
            title="Active Staff"
            value="87"
            icon={<TeamOutlined />}
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <DashboardCard
            title="Departments"
            value="6"
            icon={<TeamOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
}
