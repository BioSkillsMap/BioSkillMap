import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Connection } from "react-flow-renderer";

interface HandlerStack {
  [id: string]: {
    handleX: number;
    handleY: number;
    targetID: string;
  }[];
}

interface CardInternals {
  handlers: HandlerStack;
  connection: Connection;
}

export const CardSlice = createSlice({
  name: "counter",
  initialState: {
    handlers: {} as HandlerStack,
    connection: {} as Connection,
  } as CardInternals,
  reducers: {
    updateCard(
      state,
      action: PayloadAction<{
        id: string;
        targetID: string;
        handleX: number;
        handleY: number;
        connection: Connection;
      }>
    ) {
      return {
        ...state,
        connection: action.payload.connection,
        handlers: {
          [action.payload.id]: [
            ...(state.handlers[action.payload.id] || []),
            {
              handleX: action.payload.handleX,
              handleY: action.payload.handleY,
              targetID: action.payload.targetID,
            },
          ],
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCard } = CardSlice.actions;

export default CardSlice.reducer;
