import React, {ReactElement, useState} from "react";
import {DocumentTextIcon, PlusCircleIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

function AdminBasicLayout({children}: {children: React.ReactNode}): ReactElement {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col h-screen">
                <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold text-blue-600">
                                MyTODO
                            </Link>
                        </div>

                    </div>


                    {/* Hamburger Menu Button for Mobile */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div
                            className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-500 ease-in-out transform origin-top ${
                                isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                            }`}
                        >
                            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link to="/"
                                      className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
                                    Home
                                </Link>
                                <Link to="/contact"
                                      className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
                                    Contact
                                </Link>
                                <Link to="/todo"
                                      className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
                                    Todo
                                </Link>
                                <Link to="/product/add"
                                      className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
                                    Product
                                </Link>
                            </nav>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <div className="flex-1 flex h-full overflow-hidden">
                    {/* Aside Section */}
                    <aside
                        className="w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white p-6 hidden md:flex flex-col h-full" // h-full 유지
                    >
                        <h2 className="text-xl font-semibold mb-6">Admin</h2>
                        <nav className="space-y-4">
                            <Link to="/admin/list"
                                  className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded-md">
                                <DocumentTextIcon className="h-5 w-5"/>
                                <span>컨텐츠 관리</span>
                            </Link>
                            <Link to="/admin/chart"
                                  className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded-md">
                                <ChartBarIcon className="h-5 w-5"/>
                                <span>통계</span>
                            </Link>
                        </nav>
                    </aside>


                    {/* Main Section */}
                    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                        {/* Page Title */}

                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AdminBasicLayout;