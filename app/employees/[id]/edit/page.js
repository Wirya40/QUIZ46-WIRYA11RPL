"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form, Input, Button, message, Spin } from "antd";

export default function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  // FETCH EMPLOYEE
  useEffect(() => {
    if (!id) return;

    async function fetchEmployee() {
      try {
        const res = await fetch(`/api/employees/${id}`);
        const data = await res.json();

        // Map API JSON → Form fields
        form.setFieldsValue({
          name: data.name || "",
          email: data.email || "",
          position: data.position || "",
        });

        setLoading(false);
      } catch (error) {
        message.error("Failed to load employee");
      }
    }

    fetchEmployee();
  }, [id, form]);

  // SUBMIT UPDATE
  const onFinish = async (values) => {
    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      message.success("Employee updated");
      router.push("/employees");
    } else {
      message.error("Failed to update employee");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Employee name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item label="Position" name="position">
          <Input placeholder="e.g. Manager, Developer" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="mt-4">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}
