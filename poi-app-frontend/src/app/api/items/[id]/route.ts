import { NextResponse } from 'next/server';

// 목업 데이터
const mockCompanies = [
  {
    id: 1,
    title: '테스트 회사 1',
    description: '테스트 회사 1에 대한 상세 설명입니다. 이 회사는 IT 솔루션을 제공하는 기업입니다.',
    address: '서울시 강남구',
    industry: 'IT',
    employeeCount: '100-500',
    foundedYear: 2010
  },
  {
    id: 2,
    title: '테스트 회사 2',
    description: '테스트 회사 2에 대한 상세 설명입니다. 이 회사는 핀테크 솔루션을 전문으로 합니다.',
    address: '서울시 서초구',
    industry: '금융/핀테크',
    employeeCount: '50-100',
    foundedYear: 2015
  },
  {
    id: 3,
    title: '테스트 회사 3',
    description: '테스트 회사 3에 대한 상세 설명입니다. AI 기술을 연구개발하는 스타트업입니다.',
    address: '서울시 성동구',
    industry: 'AI/연구개발',
    employeeCount: '10-50',
    foundedYear: 2020
  }
];

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  
  try {
    const companyId = parseInt(id);
    const company = mockCompanies.find(company => company.id === companyId);

    if (!company) {
      return new NextResponse(JSON.stringify({ error: '회사를 찾을 수 없습니다.' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify(company), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 