import React from "react";
import wrapWithProvider from "./wrap-with-provider"

export const wrapRootElement = wrapWithProvider

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