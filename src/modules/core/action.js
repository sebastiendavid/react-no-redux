export function action(type) {
  return payload => ({ type, payload });
}
