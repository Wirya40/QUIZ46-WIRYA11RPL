"use client";

import { Card, Button, Skeleton, Select, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EmployeeDetailCard({ employee, departments }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentEmployee, setCurrentEmployee] = useState(employee);
  const router = useRouter();

  if (!employee) return <Skeleton active />;

  // SAFE FUNCTION TO UPDATE EMPLOYEE
  const updateEmployee = async (payload) => {
    try {
      const res = await fetch(`/api/employees/${employee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      setCurrentEmployee(payload);
      message.success("Updated!");
    } catch (err) {
      console.error(err);
      message.error(err.message || "Update failed");
    }
  };

  // HANDLE FORM SUBMIT
  const handleUpdate = (values) => {
    // Find department object safely
    const departmentObj = departments.find((d) => d.name === values.department);

    const payload = {
      ...currentEmployee,
      firstName: values.firstName,
      email: values.email,
      company: {
        ...currentEmployee.company,
        department: departmentObj ? departmentObj.name : values.department,
      },
    };

    updateEmployee(payload);
    setOpen(false);
  };

  // DELETE EMPLOYEE
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/employees/${employee.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      message.success("Deleted!");
      router.push("/employees");
      router.refresh(); // refresh server data
    } catch (err) {
      console.error(err);
      message.error(err.message || "Delete failed");
    }
  };

  // INLINE DEPARTMENT CHANGE
  const handleDepartmentChange = (value) => {
    const departmentObj = departments.find((d) => d.name === value);
    const payload = {
      ...currentEmployee,
      company: {
        ...currentEmployee.company,
        department: departmentObj ? departmentObj.name : value,
      },
    };
    updateEmployee(payload);
  };

  return (
    <Card title={`${currentEmployee.firstName} ${currentEmployee.lastName}`} style={{ maxWidth: 600 }}>
      <Image
        src={currentEmployee.image || "/placeholder.png"}
        width={100}
        height={100}
        alt="profile"
        style={{ borderRadius: "50%" }}
      />

      <p>Email: {currentEmployee.email}</p>
      <p>Phone: {currentEmployee.phone}</p>
      <p>Age: {currentEmployee.age}</p>
      <p>Address: {currentEmployee.address?.address}</p>
      <p>Company: {currentEmployee.company?.name}</p>

      <p>Department:</p>
      <Select
        style={{ width: 200 }}
        value={currentEmployee.company?.department || undefined}
        onChange={handleDepartmentChange}
      >
        {departments.map((d) => (
          <Select.Option key={d.slug} value={d.name}>
            {d.name}
          </Select.Option>
        ))}
      </Select>

      <br />
      <br />

      <Button onClick={() => router.back()}>Back</Button>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginLeft: 8 }}>
        Edit
      </Button>
      <Button danger onClick={handleDelete} style={{ marginLeft: 8 }}>
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
            firstName: currentEmployee.firstName,
            email: currentEmployee.email,
            department: currentEmployee.company?.department,
          }}
          onFinish={handleUpdate}
        >
          <Form.Item name="firstName" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="department" label="Department" rules={[{ required: true }]}>
            <Select>
              {departments.map((d) => (
                <Select.Option key={d.slug} value={d.name}>
                  {d.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
