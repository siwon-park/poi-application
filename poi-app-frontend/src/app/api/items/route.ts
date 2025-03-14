import { NextResponse } from 'next/server';

// 임시 데이터 - 실제로는 데이터베이스에서 가져와야 합니다
const dummyItems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `아이템 ${i + 1}`,
  description: `아이템 ${i + 1}에 대한 설명입니다.`,
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const items = dummyItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dummyItems.length / limit);

  return NextResponse.json({
    items,
    currentPage: page,
    totalPages,
    totalItems: dummyItems.length,
  });
} 