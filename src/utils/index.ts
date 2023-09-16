export function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueId = "";

  uniqueId += timestamp;

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * randomChars.length);
    uniqueId += randomChars.charAt(randomIndex);
  }

  return uniqueId;
}
