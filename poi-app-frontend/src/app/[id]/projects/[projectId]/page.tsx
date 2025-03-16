'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EditProjectModal from '../../../components/EditProjectModal';
import DeleteProjectModal from '../../../components/DeleteProjectModal';

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

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string; projectId: string };
}) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // TODO: API에서 실제 프로젝트 데이터 가져오기
    const fetchProject = async () => {
      try {
        // 임시 데이터
        const dummyProject: Project = {
          id: params.projectId,
          title: `프로젝트 ${params.projectId}`,
          description: '이것은 프로젝트에 대한 상세한 설명입니다.',
          status: '진행중',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          projectManager: '김철수',
          hasSubcontractor: true,
          subcontractor: '하도급사 A',
          clientManager: '이영희',
        };

        setProject(dummyProject);
      } catch (error) {
        console.error('프로젝트 정보를 불러오는 중 오류 발생:', error);
        alert('프로젝트 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.projectId]);

  const handleEdit = async (data: Omit<Project, 'id'>) => {
    try {
      // TODO: API 호출로 프로젝트 정보 업데이트
      setProject({ ...data, id: project!.id });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('프로젝트 수정 중 오류 발생:', error);
      alert('프로젝트 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      // TODO: API 호출로 프로젝트 삭제
      router.push(`/${params.id}`);  // 회사 상세 페이지로 이동
    } catch (error) {
      console.error('프로젝트 삭제 중 오류 발생:', error);
      alert('프로젝트 삭제에 실패했습니다.');
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case '진행중':
        return 'bg-blue-100 text-blue-800';
      case '완료':
        return 'bg-green-100 text-green-800';
      case '계획중':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl mb-4">프로젝트를 찾을 수 없습니다.</p>
          <Link
            href={`/${params.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            회사 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/${params.id}`}
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
          목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">프로젝트 설명</h2>
            <p className="text-gray-600 whitespace-pre-line">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">PM</h2>
              <p className="text-gray-600">{project.projectManager}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">고객사 담당자</h2>
              <p className="text-gray-600">{project.clientManager}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">시작일</h2>
              <p className="text-gray-600">{project.startDate}</p>
            </div>
            {project.endDate && (
              <div>
                <h2 className="text-lg font-semibold mb-2">종료일</h2>
                <p className="text-gray-600">{project.endDate}</p>
              </div>
            )}
          </div>

          {project.hasSubcontractor && (
            <div>
              <h2 className="text-lg font-semibold mb-2">하도급사</h2>
              <p className="text-gray-600">{project.subcontractor}</p>
            </div>
          )}

          <div className="flex justify-between gap-3 pt-6 mt-6 border-t">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // TODO: 기능 구현
                  alert('아직 구현되지 않은 기능입니다.');
                }}
                className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2"
              >
                <img
                  src="/images/excel_logo.png"
                  alt="Excel"
                  className="w-5 h-5"
                />
                엑셀 다운
              </button>
              <button
                onClick={() => {
                  // TODO: 기능 구현
                  alert('아직 구현되지 않은 기능입니다.');
                }}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                <img
                  src="/images/word_logo.png"
                  alt="Word"
                  className="w-5 h-5"
                />
                워드 다운
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
        projectTitle={project.title}
      />
    </div>
  );
} 