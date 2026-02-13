export function bToKb(bytes: number): number {
  return bytes / 1024;
}

export function bToGB(bytes: number): number {
  return bytes / (1024 * 1024 * 1024);
}
