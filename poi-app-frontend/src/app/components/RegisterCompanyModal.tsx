'use client';

import { useState } from 'react';

interface RegisterCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompanyFormData {
  name: string;
  address: string;
  affiliates: string[];
}

export default function RegisterCompanyModal({ isOpen, onClose }: RegisterCompanyModalProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    address: '',
    affiliates: []
  });
  const [affiliateInput, setAffiliateInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출 로직 추가
    console.log('제출된 데이터:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAffiliate = () => {
    if (affiliateInput.trim()) {
      setFormData(prev => ({
        ...prev,
        affiliates: [...prev.affiliates, affiliateInput.trim()]
      }));
      setAffiliateInput('');
    }
  };

  const handleRemoveAffiliate = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      affiliates: prev.affiliates.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAffiliate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-start p-8 border-b">
          <div>
            <h2 className="text-2xl font-bold mb-2">회사 등록</h2>
            <p className="text-gray-600">
              회사 정보를 입력해주세요.
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

        {/* 모달 본문 */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                회사명
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="회사명을 입력해주세요"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                회사 주소
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="회사 주소를 입력해주세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                계열사
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={affiliateInput}
                  onChange={(e) => setAffiliateInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="계열사 이름을 입력해주세요"
                />
                <button
                  type="button"
                  onClick={handleAddAffiliate}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  추가
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.affiliates.map((affiliate, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <span>{affiliate}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAffiliate(index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="w-4 h-4"
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
                ))}
              </div>
            </div>
          </div>

          {/* 모달 푸터 */}
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