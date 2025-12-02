"use client";

import { Card, Flex } from "antd";

export default function DashboardContent({ total, departments }) {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      {/* Total Employees */}
      <Card title="Total Employees" variant="outlined">
        <h2>{total}</h2>
      </Card>

      {/* Departments */}
      <Card title="Departments (SSG)" variant="outlined">
        <Flex vertical gap={8}>
          {departments.map((item) => (
            <div
              key={item.slug}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #eee",
              }}
            >
              {item.name}
            </div>
          ))}
        </Flex>
      </Card>
    </div>
  );
}
