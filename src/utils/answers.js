// Normalize: lowercase, trim, collapse spaces, strip punctuation
function norm(s) {
  return String(s).toLowerCase().trim().replace(/\s+/g, ' ').replace(/[^a-z0-9 ]/g, '')
}

export function checkAnswer(input, gate) {
  const n = norm(input)
  return gate.answers.some(a => norm(a) === n)
}
