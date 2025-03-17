'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EditCompanyModal from '../components/EditCompanyModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ProjectList from '../components/ProjectList';
import RegisterProjectModal from '../components/RegisterProjectModal';
import Pagination from '@/components/Pagination';

interface Project {
  id: string;
  title: string;
  description: string;
  status: '진행중' | '완료' | '계획중';
  startDate: string;
  endDate?: string;
  projectManager: string;
  hasSubcontractor: boolean;
  subcontractor?: string;
  clientManager: string;
}

interface Company {
  id: number;
  name: string;
  address: string;
  aliasNames: string[];
}

interface CompanyFormData {
  name: string;
  address: string;
  aliasNames: string[];
}

interface ProjectFormData {
  title: string;
  description: string;
  status: '진행중' | '완료' | '계획중';
  startDate: string;
  endDate?: string;
  projectManager: string;
  hasSubcontractor: boolean;
  subcontractor?: string;
  clientManager: string;
}

const ITEMS_PER_PAGE = 5;

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/company/${params.id}`);
        const data = await response.json();
        console.log(data);
        setCompany(data);
      } catch (error) {
        console.error('회사 정보를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchCompany();
  }, [params.id]);

  useEffect(() => {
    // TODO: API에서 실제 프로젝트 데이터 가져오기
    const fetchProjects = async () => {
      // 임시 데이터
      const dummyProjects: Project[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `프로젝트 ${i + 1}`,
        description: `이것은 프로젝트 ${i + 1}의 설명입니다.`,
        status: i % 3 === 0 ? '진행중' : i % 3 === 1 ? '완료' : '계획중',
        startDate: '2024-01-01',
        endDate: i % 2 === 0 ? '2024-12-31' : undefined,
        projectManager: '김프로젝트매니저',
        hasSubcontractor: i % 2 === 0,
        subcontractor: i % 2 === 0 ? '이서브계약사' : undefined,
        clientManager: '박클라이언트매니저'
      }));

      setProjects(dummyProjects);
      setTotalPages(Math.ceil(dummyProjects.length / ITEMS_PER_PAGE));
    };

    fetchProjects();
  }, []);

  const handleEdit = async (data: CompanyFormData) => {
    try {
      // TODO: API 호출로 데이터 업데이트
      if (company) {
        setCompany({ ...data, id: company.id });
      }
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('회사 정보 수정 중 오류가 발생했습니다:', error);
      alert('회사 정보 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      // TODO: API 호출로 회사 삭제
      router.push('/');  // 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error('회사 삭제 중 오류 발생:', error);
      alert('회사 삭제에 실패했습니다.');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRegisterProject = async (data: Omit<Project, 'id'>) => {
    try {
      // TODO: API 호출로 프로젝트 등록
      const newProject: Project = {
        ...data,
        id: String(projects.length + 1), // 임시 ID 생성
      };
      setProjects(prev => [...prev, newProject]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('프로젝트 등록 중 오류가 발생했습니다:', error);
      alert('프로젝트 등록에 실패했습니다.');
    }
  };

  const getCurrentPageProjects = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return projects.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-gray-600 hover:text-black transition-colors inline-flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
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
          메인으로 돌아가기
        </Link>
      </div>

      <div className="space-y-8">
        {/* 회사 정보 섹션 */}
        {company && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">주소</h2>
                <p className="text-gray-600">{company.address}</p>
              </div>
              {company.aliasNames && company.aliasNames.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">계열사</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.aliasNames.map((alias, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {alias}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 프로젝트 목록 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ProjectList
            projects={getCurrentPageProjects()}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRegisterProject={handleRegisterProject}
            companyId={params.id}
          />
        </div>
      </div>

      <EditCompanyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        initialData={company}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        companyName={company?.name || ''}
      />

      <RegisterProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegisterProject}
      />
    </div>
  );
} 