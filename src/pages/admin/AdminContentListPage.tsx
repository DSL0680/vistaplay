import AdminContentListComponent from "../../components/admin/AdminContentListComponent.tsx";

function AdminContentListPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">컨텐츠 관리</h1>
                <p className="ml-1 text-gray-600 mt-2">
                    Content Management
                </p>
            </div>
            <div className="w-full max-w-full mx-auto p-4 bg-white rounded-lg shadow-md">
            <AdminContentListComponent />
            </div>
        </div>
    );
}

export default AdminContentListPage;