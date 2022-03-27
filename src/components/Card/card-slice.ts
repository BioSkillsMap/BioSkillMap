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

interface Card {
  id: string;
  targetID: string;
  handlerX: number;
  handlerY: number;
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
        card: Card;
        connection: Connection;
      }>
    ) {
      return {
        ...state,
        connection: action.payload.connection,
        handlers: {
          ...state.handlers,
          [action.payload.card.id]: [
            ...(state.handlers[action.payload.card.id] || []),
            {
              handleX: action.payload.card.handlerX,
              handleY: action.payload.card.handlerY,
              targetID: action.payload.card.targetID,
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
