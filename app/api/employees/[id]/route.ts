import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "data", "employees.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const employees = JSON.parse(jsonData);

    const employee = employees.find(
      (emp: any) => emp.id === Number(params.id)
    );

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error reading employee by ID:", error);
    return NextResponse.json(
      { error: "Failed to load employee" },
      { status: 500 }
    );
  }
}
