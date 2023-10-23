import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from '/src/store/store';
import window from "global/window";

export default ({ element }) => {
    return (
        <Provider store={store}>
            {typeof window === "undefined" ? element :
                <PersistGate loading={null} persistor={persistor}>
                    {element}
                </PersistGate>
            }
        </Provider>
    )
}
