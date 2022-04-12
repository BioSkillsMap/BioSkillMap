import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Changes {
  type: "add" | "delete" | "move";
  id: string;
}

const ChangesSlice = createSlice({
  initialState: [] as Changes[],
  name: "changes",
  reducers: {
    recordChange(state, action: PayloadAction<Changes>) {
      console.log({
        id: action.payload.id,
        type: action.payload.type,
      });
      return [
        ...state,
        {
          id: action.payload.id,
          type: action.payload.type,
        },
      ];
    },
  },
});

export default ChangesSlice.reducer;
export const { recordChange } = ChangesSlice.actions;
