export default function makeAction(type) {
  return payload => ({ type, payload });
}
