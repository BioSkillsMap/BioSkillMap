import { createSlice } from "@reduxjs/toolkit"
const sidebar = createSlice({
    initialState: false,
    name: "isOpen",
    reducers: {
        openSidebar() {
            return true;
        },
        closeSidebar() {
            return false;
        }
    }
});

export const { openSidebar, closeSidebar } = sidebar.actions;
export default sidebar.reducer;