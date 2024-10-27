import React, {ReactElement, useState} from "react";
import {Link} from "react-router-dom";


function ContentBasicLayout({ children }: { children: React.ReactNode }): ReactElement {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };


    return (
        <div>
            <header className="bg-white w-full">
                <nav className="w-[90%] mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex mr-10">
                        <Link to="/list" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="/vistaplay_logo.png" alt="/list" />
                        </Link>
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
                        <Link to="/list/movie" className="text-sm font-semibold leading-6 text-gray-900">
                            영화
                        </Link>
                        <Link to="/list/drama" className="text-sm font-semibold leading-6 text-gray-900">
                            드라마
                        </Link>
                        <Link to="/list/entertainment" className="text-sm font-semibold leading-6 text-gray-900">
                            예능
                        </Link>
                        <Link to="/list/animations" className="text-sm font-semibold leading-6 text-gray-900">
                            애니
                        </Link>
                    </div>

                    {/* 시청기록, 찜목록 */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">

                        <Link to="/watch">
                            <button
                                type="button"
                                className="w-full mt-2 text-sm font-semibold leading-6 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
                            >
                                시청기록
                            </button>
                        </Link>
                        <Link to="/wish">
                            <button
                                type="button"
                                className="w-full mt-2 text-sm font-semibold leading-6 text-indigo-600 px-4 py-2 border border-indigo-600 rounded-lg hover:bg-indigo-100"
                            >
                                찜 목록
                            </button>
                        </Link>
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
                            <div className="mt-6">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="py-6 space-y-2">
                                        <Link to="/list/movie" className="block text-sm font-semibold leading-6 text-gray-900">
                                            영화
                                        </Link>
                                        <Link to="/list/drama" className="block text-sm font-semibold leading-6 text-gray-900">
                                            드라마
                                        </Link>
                                        <Link to="/list/entertainment" className="block text-sm font-semibold leading-6 text-gray-900">
                                            예능
                                        </Link>
                                        <Link to="/list/animations" className="block text-sm font-semibold leading-6 text-gray-900">
                                            애니
                                        </Link>
                                    </div>

                                    <div className="py-6">

                                        <Link
                                            to="/watch"
                                            className="w-full mt-4 text-sm font-semibold leading-6 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 text-center block"
                                        >
                                            시청기록
                                        </Link>
                                        <Link
                                            to="/wish"
                                            className="w-full mt-2 text-sm font-semibold leading-6 text-indigo-600 px-4 py-2 border border-indigo-600 rounded-lg hover:bg-indigo-100 text-center block"
                                        >
                                            찜 목록
                                        </Link>
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
