import slugify from "slugify";

export const normalizeCardID = (cardID: string) => {
  return slugify(cardID, {
    lower: true,
  });
};
