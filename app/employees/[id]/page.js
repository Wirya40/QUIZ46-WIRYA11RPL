import EmployeeDetailCard from "../../components/EmployeeDetailCard";

export const revalidate = 60;

async function getEmployee(id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  return res.json();
}

async function getDepartments() {
  const res = await fetch("https://dummyjson.com/products/categories");
  return res.json();
}

export default async function EmployeeDetailPage(props) {
  const { id } = await props.params; // ✅ FIX: params is a Promise

  const employee = await getEmployee(id);
  const departments = await getDepartments();

  return (
    <EmployeeDetailCard
      employee={employee}
      departments={departments}
    />
  );
}
