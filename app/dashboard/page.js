import DashboardContent from "./DashboardContent";

// ⚡ SSR — total employees
async function getEmployees() {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  return { total: data.total };
}

// ⚡ SSG — departments
async function getDepartments() {
  const res = await fetch("https://dummyjson.com/products/categories", {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function DashboardPage() {
  const { total } = await getEmployees();
  const departments = await getDepartments();

  return <DashboardContent total={total} departments={departments} />;
}
