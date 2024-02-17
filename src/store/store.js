import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import backgroundSlice from "./background/backgroundSlice";
import createAdvert from "./createAdvert/advertSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import supportTicketReducer from "./supportTicket/supportTicketSlice";
import logoSlice from "./uploadLogo/logoSlice";
import userSlice from "./user/userSlice";
import subscriptionSlice from "./subscription/subscriptionSlice";
const reducers = combineReducers({
  user: userSlice,
  dashboard: dashboardSlice,
  advert: createAdvert,
  logo: logoSlice,
  supportTicket: supportTicketReducer,
  background: backgroundSlice,
  subscription: subscriptionSlice,
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
