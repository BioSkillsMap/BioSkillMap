import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardStack {
  [id: string]: {
    handleX: number;
    handleY: number;
    targetID: string;
  }[];
}

export const HandleSlice = createSlice({
  name: "counter",
  initialState: {} as CardStack,
  reducers: {
    addHandler(
      state,
      action: PayloadAction<{
        id: string;
        targetID: string;
        handleX: number;
        handleY: number;
      }>
    ) {
      return {
        ...state,
        [action.payload.id]: [
          ...(state[action.payload.id] || []),
          {
            handleX: action.payload.handleX,
            handleY: action.payload.handleY,
            targetID: action.payload.targetID,
          },
        ],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHandler } = HandleSlice.actions;

export default HandleSlice.reducer;
