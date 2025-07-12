import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const { data } = await api(`/notes/${id}`);
    if (data) return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      status: '500',
      message: 'Unable to retrieve note. It might not exist.',
    });
  }
}
