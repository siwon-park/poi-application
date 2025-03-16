'use client';

import { useState } from 'react';
import RegisterProjectModal from './RegisterProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  status: '진행중' | '완료' | '계획중';
  startDate: string;
  endDate?: string;
}

interface ProjectListProps {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRegisterProject: (data: Omit<Project, 'id'>) => void;
}

export default function ProjectList({
  projects,
  currentPage,
  totalPages,
  onPageChange,
  onRegisterProject,
}: ProjectListProps) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">프로젝트 목록</h2>
        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          프로젝트 등록
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>시작일: {project.startDate}</span>
              {project.endDate && <span>종료일: {project.endDate}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === page
                ? 'bg-black text-white'
                : 'hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          다음
        </button>
      </div>

      <RegisterProjectModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmit={onRegisterProject}
      />
    </div>
  );
} 