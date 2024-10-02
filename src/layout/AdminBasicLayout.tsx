import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // 햄버거 메뉴 아이콘과 닫기 아이콘 사용

function AdminBasicLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Mobile Menu Button */}
            <div className="lg:hidden p-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-800 focus:outline-none"
                >
                    {sidebarOpen ? (
                        <XMarkIcon className="h-8 w-8" />
                    ) : (
                        <Bars3Icon className="h-8 w-8" />
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 transform lg:transform-none transition-transform duration-300 ease-in-out z-30 bg-gray-800 text-white w-64 lg:w-64 lg:relative ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-center p-6">
                    {/* 로고 */}
                    <img src="/path-to-your-logo.png" alt="Logo" className="h-12 w-auto" />
                </div>

                {/* Sidebar navigation */}
                <nav className="flex-1 px-4 py-6">
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700">
                        콘텐츠 관리
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700">
                        통계
                    </a>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6 lg:ml-64">
                <h1 className="text-xl font-bold">관리자 메인 페이지</h1>
                {/* 메인 콘텐츠가 여기에 들어갈 예정 */}
            </div>

            {/* 배경 클릭 시 사이드바 닫기 (모바일에서만) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default AdminBasicLayout;