import _ from "lodash";

export const generateInputError = (fieldName: string): string => {
  return `${_.capitalize(fieldName)} field is required`
}