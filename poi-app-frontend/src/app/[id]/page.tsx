'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface CompanyDetail {
  id: number;
  title: string;
  description: string;
  // 추가 필드들은 실제 데이터에 맞게 확장 가능
}

export default function CompanyDetail() {
  const params = useParams();
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await fetch(`/api/items/${params.id}`);
        const data = await response.json();
        console.log(data);
        setCompany(data);
      } catch (error) {
        console.error('회사 정보를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-88px)]">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-88px)] gap-4">
        <div className="text-xl">회사 정보를 찾을 수 없습니다.</div>
        <Link
          href="/"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-black transition-colors inline-flex items-center gap-2"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            목록으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h1 className="text-3xl font-bold mb-4">{company.title}</h1>
          <p className="text-gray-600 text-lg">{company.description}</p>
          
          {/* 추가 회사 정보를 여기에 표시 */}
          <div className="mt-8 grid gap-4">
            {/* 예시: 추가 정보 섹션 */}
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">회사 정보</h2>
              <p className="text-gray-600">
                추가 회사 정보는 백엔드 API 응답에 따라 확장 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 