import React, { ReactElement, useState } from "react";

function ContentBasicLayout({ children }: { children: React.ReactNode }): ReactElement {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div>
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex mr-10">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="/vistaplay_logo.png" alt="" />
                        </a>
                    </div>

                    {/* 모바일 메뉴 토글 버튼 */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            영화
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            드라마
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            예능
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            애니
                        </a>
                    </div>

                    {/* 검색창과 두 개의 버튼 */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
                        <input
                            type="text"
                            className="w-64 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search..."
                        />

                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-white bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            시청기록
                        </button>
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-blue-800 px-4 py-2 border border-blue-800 rounded-lg hover:bg-blue-100"
                        >
                            찜 목록
                        </button>
                    </div>
                </nav>

                {/* 모바일 메뉴 (isMenuOpen 상태에 따라 표시) */}
                {isMenuOpen && (
                    <div className="lg:hidden" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 z-10"></div>
                        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img className="h-8 w-auto" src="/vistaplay_logo.png" alt="" />
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={toggleMenu}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            영화
                                        </a>
                                        <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            드라마
                                        </a>
                                        <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            예능
                                        </a>
                                        <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            애니
                                        </a>
                                    </div>
                                    <div className="py-6">
                                        {/* 모바일 검색창 */}
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Search..."
                                        />
                                        {/* 두 개의 버튼 */}
                                        <button
                                            type="button"
                                            className="w-full mt-4 text-sm font-semibold leading-6 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
                                        >
                                            시청기록
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full mt-2 text-sm font-semibold leading-6 text-indigo-600 px-4 py-2 border border-indigo-600 rounded-lg hover:bg-indigo-100"
                                        >
                                            찜 목록
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
            <div className="bg-gray-100">{children}</div>
        </div>
    );
}

export default ContentBasicLayout;
