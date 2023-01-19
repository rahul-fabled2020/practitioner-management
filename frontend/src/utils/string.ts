/**
 * It takes a string template and a set of values, and replaces all the placeholders in the template
 * with the values
 *
 * @param {string} template - The template string.
 * @param values - { [key: string]: any }
 */
export function interpolate(template: string, values: { [key: string]: any }) {
  let result = template;

  for (const key in values) {
    result = result.replace(`:${key}`, values[key]);
  }

  return result;
}
