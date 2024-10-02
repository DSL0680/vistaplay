import React, {ReactElement} from "react";
import {ChartBarIcon, DocumentTextIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

function AdminBasicLayout({children}: {children: React.ReactNode}): ReactElement {

    return (
        <div>
            <div className="min-h-screen flex flex-col h-screen">
                <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img src="/vistaplay_logo.png" alt="logo" />
                        </div>

                    </div>



                </header>

                {/* Main Content */}
                <div className="flex-1 flex h-full overflow-hidden">
                    {/* Aside Section */}
                        <aside
                            className="w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white p-6 hidden md:flex flex-col h-full" // h-full 유지
                        >
                            <h2 className="text-xl font-semibold mb-6">Todo</h2>
                            <nav className="space-y-4">
                                <Link to="/admin"
                                      className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded-md">
                                    <DocumentTextIcon className="h-5 w-5"/>
                                    <span>컨텐츠 관리</span>
                                </Link>
                                <Link to="/todo/add"
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