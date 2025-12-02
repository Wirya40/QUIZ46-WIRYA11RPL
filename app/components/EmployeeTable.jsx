"use client";

import { Table, Input, Select, Space, Button } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext"; // ✅ FIXED




export default function EmployeeTable({ employees, departments }) {
  const { selectedDepartment, setSelectedDepartment } = useApp();

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(employees);

  useEffect(() => {
    let result = employees;

    if (search) {
      result = result.filter((e) =>
        e.firstName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDepartment) {
      result = result.filter(
        (e) => e.company?.department === selectedDepartment
      );
    }

    setFiltered(result);
  }, [search, selectedDepartment]);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      render: (_, r) => `${r.firstName} ${r.lastName}`,
    },
    { title: "Email", dataIndex: "email" },
    { title: "Company", dataIndex: ["company", "name"] },
    {
      title: "Department",
      dataIndex: ["company", "department"],
    },
    {
      title: "Action",
      render: (record) => (
        <Link href={`/employees/${record.id}`}>
          <Button type="link">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          placeholder="Filter department"
          style={{ width: 200 }}
          value={selectedDepartment || undefined}
          onChange={setSelectedDepartment}
          allowClear
        >
          {departments.map((d) => (
            <Select.Option key={d} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
      </Space>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
