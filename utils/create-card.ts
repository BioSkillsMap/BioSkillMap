import { Node } from "react-flow-renderer";
import { normalizeCardID } from "./slugify";

export interface Data {
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "Roxy";
  description: string;
}

export const createCard = (title: string, difficulty: string) => {
  return {
    id: normalizeCardID(title),
    type: "Card",
    data: {
      title,
      difficulty,
      description:
        "Web Development is very much about learning new things, and we want to provide everything you need to kickstart your journey" as string,
    } as Data,
    position: {
      x: 0,
      y: 0,
    },
  } as Node<Data>;
};

// {
//     id: "1",
//     type: "Card",
//     data: {
//       id: "Web Development",
//       level: "beginner",
//       description:
//         "Web Development is very much about learning new things, and we want to provide everything you need to kickstart your journey",
//     } as Data,
//     position: { x: 0, y: 0 },
//   },
