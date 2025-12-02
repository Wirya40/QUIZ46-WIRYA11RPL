import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "employees.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const employees = JSON.parse(jsonData);

    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error reading employees.json:", error);
    return NextResponse.json(
      { error: "Failed to load employee data" },
      { status: 500 }
    );
  }
}
