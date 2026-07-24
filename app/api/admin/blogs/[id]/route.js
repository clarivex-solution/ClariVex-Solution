import { verifyAdminRequest } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { sanitizeBlogHtml } from "@/lib/sanitizeHtml";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const updateData = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.content !== undefined && {
        content: sanitizeBlogHtml(body.content),
      }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.country !== undefined && { country: body.country }),
      ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
      ...(body.metaDescription !== undefined && {
        metaDescription: body.metaDescription,
      }),
      ...(body.tags !== undefined && { tags: body.tags }),
    };
    if (updateData.status === "published" && !existingBlog.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const updateData = { status: body.status };
  if (body.content !== undefined) {
    updateData.content = sanitizeBlogHtml(body.content);
  }
  if (body.status === "published") {
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (existing && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }
  const updated = await prisma.blog.update({
    where: { id },
    data: updateData,
  });
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
