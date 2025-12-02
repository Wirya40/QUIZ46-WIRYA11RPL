import EmployeeTable from "../components/EmployeeTable";

export const dynamic = "force-dynamic"; // SSR

async function getEmployees() {
  const res = await fetch("https://dummyjson.com/users", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.users;
}

async function getDepartments() {
  const res = await fetch("https://dummyjson.com/products/categories", {
    cache: "no-store",
  });
  return res.json();
}

export default async function EmployeesPage() {
  const employees = await getEmployees();
  const departments = await getDepartments();

  return <EmployeeTable employees={employees} departments={departments} />;
}
