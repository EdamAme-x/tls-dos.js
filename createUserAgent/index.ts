import list from "./list.json" assert { type: "json" };
const len = list.length;

export function createUserAgent() {
  return list[Math.floor(Math.random() * len)];
}
