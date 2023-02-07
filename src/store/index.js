import {
    configureStore
} from '@reduxjs/toolkit'
import goodsReducer from './goodsList'
import reduxLogger from "redux-logger";
import menuReducer from './menu'
import info from './info';
export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
    reducer: {
        goodsList: goodsReducer,
        MenuList:menuReducer,
        userInfoList:info
    }
})