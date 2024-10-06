import React, {ReactElement} from "react";

function ContentBasicLayout({children}: {children: React.ReactNode}): ReactElement {
    return (
        <div>
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

                    <div className="flex mr-6">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto"
                                 src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                        </a>
                    </div>

                    <div className="flex lg:hidden">
                        <button type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        <div className="relative">
                            <button type="button"
                                    className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                                    aria-expanded="false">
                                영화
                            </button>
                        </div>

                        <a href="/admin/add" className="text-sm font-semibold leading-6 text-gray-900">드라마</a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">예능</a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">애니메이션</a>
                    </div>

                    {/* 검색창을 메뉴 오른쪽에 추가 */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
                        <input
                            type="text"
                            className="w-64 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search..."
                        />

                        {/* 두 개의 버튼 추가 */}
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            시청기록
                        </button>
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-indigo-600 px-4 py-2 border border-indigo-600 rounded-lg hover:bg-indigo-100"
                        >
                            찜 목록
                        </button>
                    </div>
                </nav>
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-10"></div>
                    <div
                        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto"
                                     src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                     alt=""/>
                            </a>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <div className="-mx-3">
                                        <button type="button"
                                                className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                aria-controls="disclosure-1" aria-expanded="false">
                                            Product
                                            <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor"
                                                 aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </button>

                                        <div className="mt-2 space-y-2" id="disclosure-1">
                                            <a href="#"
                                               className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Analytics</a>
                                            <a href="#"
                                               className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Engagement</a>
                                            <a href="#"
                                               className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Security</a>
                                            <a href="#"
                                               className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Integrations</a>
                                            <a href="#"
                                               className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Automations</a>
                                            <a href="#"
                                               className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Watch
                                                demo</a>
                                            <a href="#"
                                               className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact
                                                sales</a>
                                        </div>
                                    </div>
                                    <span
                                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</span>
                                    <span
                                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</span>
                                    <span
                                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</span>
                                </div>
                                <div className="py-6">
                                    <a href="#"
                                       className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                                        in</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100">
                {children}
            </div>

        </div>
    );
}

export default ContentBasicLayout;
