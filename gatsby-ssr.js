import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link
            rel="preload"
            href="/fonts/Ferry-Black.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
            key="ferryFont"
        />,
    ])
}