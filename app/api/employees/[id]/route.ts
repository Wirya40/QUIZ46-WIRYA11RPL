import { NextRequest, NextResponse } from "next/server";

// GET ONE EMPLOYEE
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const data = await res.json();

  return NextResponse.json(data);
}

// UPDATE EMPLOYEE
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json({ message: "Updated successfully", data });
}

// DELETE EMPLOYEE
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return NextResponse.json({ message: "Deleted successfully", data });
}
