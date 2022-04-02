import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Connection, useReactFlow } from "react-flow-renderer";

export interface HandlerStack {
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
    rebuildHandlers(_, action: PayloadAction<HandlerStack>) {
      console.log(action.payload);
      return {
        handlers: action.payload,
        connection: {} as Connection,
      };
    },
    updateCard(
      state,
      action: PayloadAction<{
        card: Card;
        connection: Connection;
      }>
    ) {
      console.log(action.payload);
      const newState = {
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

      // console.log(newState);
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCard, rebuildHandlers } = CardSlice.actions;

export default CardSlice.reducer;
