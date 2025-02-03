import { Item } from "../types/types";

export const updateObjectInArray = (
  item: Item[],
  itemId: number,
  objPropsName: keyof Item,
  newObjPropsName: Partial<Item>
) => {
  return item.map((user) => {
    if (user[objPropsName] === itemId) {
      return { ...user, ...newObjPropsName };
    }
    return user;
  });
};
