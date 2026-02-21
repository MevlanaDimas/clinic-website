import { NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    const newsItem = await prisma.news.findFirst({
      where: { title: title },
      select: { slug: true }
    });

    return NextResponse.json({ slug: newsItem?.slug || null });
  } catch (e) {
    console.error("News Link API Error:", e);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}