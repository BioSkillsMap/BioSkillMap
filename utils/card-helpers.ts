import { HandleElement, Node, useNodes } from "react-flow-renderer";
import { IDFrom } from "./helpers";

export type Difficulties = "beginner" | "intermediate" | "advanced" | "Roxy";

export interface Data {
  title: string;
  difficulty: Difficulties;
  description: string;
}

export const normalizeCards = (cardsFromDatabase: Node<Data>[]) => {
  return cardsFromDatabase.map(
    (card) =>
      ({
        ...card,
        id: card.id,
        position: card.position,
      } as Node<Data>)
  );
};

export const createCard = ({ description, difficulty, title }: Data) => {
  return {
    id: IDFrom(title),
    data: {
      description,
      difficulty,
      title,
    },
    type: "Card",
    position: {
      x: 0,
      y: 0,
    },
  } as Node<Data>;
};
