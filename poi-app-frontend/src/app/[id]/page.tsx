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

export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyId, setCompanyId] = useState<string>('');

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setCompanyId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyId) return;
      
      try {
        const response = await fetch(`http://localhost:8080/api/v1/company/${companyId}`);
        const data = await response.json();
        console.log(data);
        setCompany(data);
      } catch (error) {
        console.error('회사 정보를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchCompany();
  }, [companyId]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!companyId) return;
      
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/company/${companyId}/list?&page=${currentPage - 1}`
        );
        const data = await response.json();
        console.log(data);
        // API 응답 데이터를 Project 인터페이스에 맞게 변환
        const projects: Project[] = data.content.map((project: any) => ({
          id: String(project.id),
          title: project.name,
          description: project.description,
          status: project.status || '계획중',
          startDate: project.startDate.split('T')[0],
          endDate: project.endDate ? project.endDate.split('T')[0] : undefined,
          projectManager: project.projectManager,
          hasSubcontractor: project.hasOutSourcing,
          clientManager: project.customer
        }));

        setProjects(projects);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('프로젝트 목록을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchProjects();
  }, [companyId, currentPage]);

  const handleEdit = async (data: CompanyFormData) => {
    try {
      if (!company) return;
      
      console.log('Received form data:', data);
      
      // 데이터 유효성 검사
      if (!data.name || !data.address) {
        throw new Error('회사명과 주소는 필수 입력값입니다.');
      }
      
      const requestData = {
        companyName: data.name.trim(),
        companyAddress: data.address.trim(),
        aliasNames: data.aliasNames || []
      };
      
      console.log('Sending request data:', requestData);
      
      const response = await fetch(`http://localhost:8080/api/v1/company/update/${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('회사 정보 수정에 실패했습니다.');
      }

      const updatedCompany = await response.json();
      console.log('Updated company data:', updatedCompany);
      
      setCompany(updatedCompany);
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
      if (!company) return;

      const requestData = {
        projectName: data.title,
        projectManager: data.projectManager,
        projectDescription: data.description,
        projectCustomer: data.clientManager,
        companyName: company.name,
        hasOutSourcing: data.hasSubcontractor,
        startDate: `${data.startDate}T00:00:00`,
        endDate: data.endDate ? `${data.endDate}T00:00:00` : null
      };

      console.log('Request data:', requestData);

      const response = await fetch('http://localhost:8080/api/v1/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('프로젝트 등록에 실패했습니다.');
      }

      // TODO: API 응답으로 받은 프로젝트 데이터로 상태 업데이트
      const newProject = await response.json();
      setProjects(prev => [...prev, newProject]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('프로젝트 등록 중 오류가 발생했습니다:', error);
      alert('프로젝트 등록에 실패했습니다.');
    }
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
            projects={projects}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRegisterProject={handleRegisterProject}
            companyId={companyId}
          />
        </div>
      </div>

      <EditCompanyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        initialData={company ? {
          name: company.name,
          address: company.address,
          aliasNames: company.aliasNames
        } : {
          name: '',
          address: '',
          aliasNames: []
        }}
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