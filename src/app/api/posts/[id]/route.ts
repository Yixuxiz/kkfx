import { NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      title: data.title,
      content: data.content,
      summary: data.summary,
      category: data.category,
      tags: data.tags || [],
      mood: data.mood,
      rating: data.rating,
      published: data.published,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.post.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'Post deleted successfully' });
}
