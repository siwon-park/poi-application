'use client';

import { useState, useEffect } from 'react';

interface RegisterProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
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

// 임시 데이터 (실제로는 API에서 가져와야 함)
const PROJECT_MANAGERS = [
  '구경모',
  '최경환',
  '박시원',
  '박재은',
  '김세현'
];

const SUBCONTRACTORS = [
  '스윗코드',
  '엑시스',
  '하도급사 A',
  '하도급사 B',
];

export default function RegisterProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: RegisterProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    status: '계획중',
    startDate: '',
    endDate: '',
    projectManager: '',
    hasSubcontractor: false,
    subcontractor: '',
    clientManager: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        // 하도급 체크 해제시 하도급사 선택 초기화
        ...(name === 'hasSubcontractor' && !checked ? { subcontractor: '' } : {})
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-start p-8 border-b">
          <div>
            <h2 className="text-2xl font-bold mb-2">프로젝트 등록</h2>
            <p className="text-gray-600">
              새로운 프로젝트 정보를 입력해주세요.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                프로젝트명
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="프로젝트명을 입력해주세요"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                프로젝트 설명
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="프로젝트에 대한 설명을 입력해주세요"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="projectManager" className="block text-sm font-medium text-gray-700 mb-2">
                  PM
                </label>
                <select
                  id="projectManager"
                  name="projectManager"
                  value={formData.projectManager}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">PM을 선택해주세요</option>
                  {PROJECT_MANAGERS.map((pm) => (
                    <option key={pm} value={pm}>
                      {pm}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="clientManager" className="block text-sm font-medium text-gray-700 mb-2">
                  고객사 담당자
                </label>
                <input
                  type="text"
                  id="clientManager"
                  name="clientManager"
                  value={formData.clientManager}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="고객사 담당자명을 입력해주세요"
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                상태
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="계획중">계획중</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  시작일
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  종료일
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasSubcontractor"
                  name="hasSubcontractor"
                  checked={formData.hasSubcontractor}
                  onChange={handleChange}
                  className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor="hasSubcontractor" className="ml-2 block text-sm text-gray-700">
                  하도급 유무
                </label>
              </div>

              {formData.hasSubcontractor && (
                <div>
                  <label htmlFor="subcontractor" className="block text-sm font-medium text-gray-700 mb-2">
                    하도급사
                  </label>
                  <select
                    id="subcontractor"
                    name="subcontractor"
                    value={formData.subcontractor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">하도급사를 선택해주세요</option>
                    {SUBCONTRACTORS.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 