"use client";

import { Card, Button, Skeleton, Select, Modal, Form, Input } from "antd";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EmployeeDetailCard({ employee, departments }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  if (!employee) return <Skeleton active />;

  // ✔ Ensure departments are strings, not objects
  const safeDepartments = departments.map((d) =>
    typeof d === "string" ? d : d?.name || "Unknown"
  );

  return (
    <Card
      title={`${employee.firstName} ${employee.lastName}`}
      style={{ maxWidth: 600 }}
    >
      <Image
        src={employee.image || "/placeholder.png"}
        width={100}
        height={100}
        alt="profile"
        style={{ borderRadius: "50%" }}
      />

      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Age: {employee.age}</p>
      <p>Address: {employee.address?.address}</p>

      <p>Company: {employee.company?.name}</p>

      <p>Department:</p>
      <Select
        style={{ width: 200 }}
        defaultValue={employee.company?.department}
        options={safeDepartments.map((d) => ({
          value: d,
          label: d,
        }))}
      />

      <br />
      <br />

      <Button onClick={() => router.back()}>Back</Button>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginLeft: 8 }}>
        Edit
      </Button>
      <Button danger style={{ marginLeft: 8 }}>
        Delete
      </Button>

      {/* Edit Modal */}
      <Modal
        title="Edit Employee"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          initialValues={{
            name: employee.firstName,
            email: employee.email,
          }}
          onFinish={(v) => {
            console.log("Updated:", v);
            setOpen(false);
          }}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
