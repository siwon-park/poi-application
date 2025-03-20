'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import EditProjectModal from '@/app/components/EditProjectModal';
import DeleteProjectModal from '@/app/components/DeleteProjectModal';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string | null;
  projectManager: string;
  hasOutSourcing: boolean;
  customer: string;
  companyName: string;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string; projectId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/project/${resolvedParams.projectId}`);
        if (!response.ok) {
          throw new Error('프로젝트를 찾을 수 없습니다.');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('프로젝트 정보를 불러오는 중 오류가 발생했습니다:', error);
        alert('프로젝트 정보를 불러오는데 실패했습니다.');
        router.push(`/${resolvedParams.id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [resolvedParams.projectId, router, resolvedParams.id]);

  const handleEdit = async (data: Omit<Project, 'id'>) => {
    try {
      const requestData = {
        projectName: data.name,
        projectManager: data.projectManager,
        projectDescription: data.description,
        projectCustomer: data.customer,
        companyName: data.companyName,
        hasOutSourcing: data.hasOutSourcing,
        startDate: `${data.startDate}T00:00:00`,
        endDate: data.endDate ? `${data.endDate}T00:00:00` : null
      };

      const response = await fetch(
        `http://localhost:8080/api/v1/project/${resolvedParams.projectId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );
      console.log(requestData)
      if (!response.ok) {
        throw new Error('프로젝트 수정에 실패했습니다.');
      }

      const updatedProject = await response.json();
      setProject(updatedProject);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('프로젝트 수정 중 오류가 발생했습니다:', error);
      alert('프로젝트 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/project/${resolvedParams.projectId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('프로젝트 삭제에 실패했습니다.');
      }

      router.push(`/${resolvedParams.id}`);
    } catch (error) {
      console.error('프로젝트 삭제 중 오류가 발생했습니다:', error);
      alert('프로젝트 삭제에 실패했습니다.');
    }
  };

  const handleExcelDownload = async () => {
    try {
      window.location.href = `http://localhost:8080/api/v1/download/excel/${resolvedParams.projectId}`;
    } catch (error) {
      console.error('엑셀 다운로드 중 오류가 발생했습니다:', error);
      alert('엑셀 다운로드에 실패했습니다.');
    }
  };

  const handleWordDownload = async () => {
    try {
      window.location.href = `http://localhost:8080/api/v1/download/word/${resolvedParams.projectId}`;
    } catch (error) {
      console.error('워드 다운로드 중 오류가 발생했습니다:', error);
      alert('워드 다운로드에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">프로젝트를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/${resolvedParams.id}`}
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
          회사 상세로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm ${
            project.status === '진행중' ? 'bg-green-100 text-green-800' :
            project.status === '완료' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">프로젝트 설명</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">프로젝트 정보</h2>
              <div className="space-y-2">
                <p><span className="font-medium">프로젝트 매니저:</span> {project.projectManager}</p>
                <p><span className="font-medium">고객사 담당자:</span> {project.customer}</p>
                <p><span className="font-medium">시작일:</span> {project.startDate.split('T')[0]}</p>
                <p><span className="font-medium">종료일:</span> {project.endDate ? project.endDate.split('T')[0] : '미정'}</p>
                <p><span className="font-medium">외주 여부:</span> {project.hasOutSourcing ? '예' : '아니오'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-4">
            <button 
              onClick={handleExcelDownload}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Image
                src="/images/excel_logo.png"
                alt="Excel"
                width={20}
                height={20}
              />
              엑셀 출력
            </button>
            <button 
              onClick={handleWordDownload}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Image
                src="/images/word_logo.png"
                alt="Word"
                width={20}
                height={20}
              />
              워드 출력
            </button>
          </div>
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
      </div>

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        initialData={project}
      />

      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        projectTitle={project.name}
      />
    </div>
  );
} 