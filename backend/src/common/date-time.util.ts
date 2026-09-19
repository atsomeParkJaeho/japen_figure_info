export function currentDatePart(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export function currentTimePart(): string {
  return new Date().toISOString().slice(11, 19); // HH:MM:SS
}
