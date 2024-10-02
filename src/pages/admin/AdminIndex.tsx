import AdminBasicLayout from "../../layout/AdminBasicLayout.tsx";
import {Outlet} from "react-router-dom";

function AdminIndex() {
    return (
        <AdminBasicLayout>
            <h1>Admin Index</h1>
            <Outlet></Outlet>
        </AdminBasicLayout>
    );
}

export default AdminIndex;