import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import commentSlice from "./commentSlice";
import showMenuSlice from "./showMenuSlice";
import  isUserSlice  from "./isUserSlice";


import { persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";


const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const rootReducer = combineReducers({user: userSlice, video: videoSlice, comment: commentSlice, menu: showMenuSlice,isUser: isUserSlice});
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    })
   
},
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store)