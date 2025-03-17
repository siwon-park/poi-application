'use client'; // 이 줄을 추가하면 클라이언트 컴포넌트로 동작함

import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import RegisterCompanyModal from './components/RegisterCompanyModal';

interface Item {
  id: number;
  name: string;
  address: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/company/list?page=${page - 1}${
          searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
        }`
      );
      const data = await response.json();
      
      setItems(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleCompanyRegistered = () => {
    fetchItems(currentPage);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* 섹션 1: 회사 목록 및 검색 */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-geist-sans)]">회사 목록</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="회사 검색..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 섹션 2: 회사 등록 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold"
          >
            회사 등록
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            로딩 중...
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  className="block"
                >
                  <div
                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.address}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <RegisterCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCompanyRegistered}
      />
    </main>
  );
}
