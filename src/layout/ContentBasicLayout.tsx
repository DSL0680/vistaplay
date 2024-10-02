import React, {ReactElement} from "react";

function ContentBasicLayout({children}: {children: React.ReactNode}): ReactElement {
    return (
        <div>
            <h1>ContentBasicLayout</h1>
            {children}
        </div>
    );
}

export default ContentBasicLayout;