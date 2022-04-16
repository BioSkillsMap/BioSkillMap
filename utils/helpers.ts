import slugify from "slugify";

export const IDFrom = (s: string) => {
  return slugify(s || "", {
    lower: true,
  });
};

export const toArray = <T>(input: T) => {
  if (Array.isArray(input)) return input as T[];
  else return [input];
};
