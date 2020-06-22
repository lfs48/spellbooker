// Standard actions

import { SELECT_CLASS } from "../types";

export const selectClass = (dndclass) => ({
    type: SELECT_CLASS,
    dndclass: dndclass
});