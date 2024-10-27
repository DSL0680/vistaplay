
import ContentBasicLayout from "../../layout/ContentBasicLayout.tsx";
import {Outlet} from "react-router-dom";

function ContentIndex() {
    return (
        <ContentBasicLayout>
            <Outlet></Outlet>
        </ContentBasicLayout>
    );
}

export default ContentIndex;