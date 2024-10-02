import AdminBasicLayout from "../../layout/AdminBasicLayout.tsx";
import {Outlet} from "react-router-dom";

function AdminIndex() {
    return (
        <AdminBasicLayout>
            <Outlet></Outlet>
        </AdminBasicLayout>
    );
}

export default AdminIndex;