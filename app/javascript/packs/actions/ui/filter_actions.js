// Standard actions

import { SELECT_CLASS, SELECT_LEVEL, SELECT_SCHOOL } from "../types";

export const selectClass = (dndclass) => ({
    type: SELECT_CLASS,
    dndclass: dndclass
});

export const selectLevel = (level) => ({
    type: SELECT_LEVEL,
    level: level
});

export const selectSchool = (school) => ({
    type: SELECT_SCHOOL,
    school: school
});