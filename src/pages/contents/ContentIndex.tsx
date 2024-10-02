
import ContentBasicLayout from "../../layout/ContentBasicLayout.tsx";
import {Outlet} from "react-router-dom";

function ContentIndex() {
    return (
        <ContentBasicLayout>
            <h1>Content Index</h1>
            <Outlet></Outlet>
        </ContentBasicLayout>
    );
}

export default ContentIndex;