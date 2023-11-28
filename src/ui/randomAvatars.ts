function generateRandomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomAvatarURL(): string {
  const randomString = generateRandomString(16);
  const avatarURL = `https://i.pravatar.cc/150?u=${randomString}`;
  return avatarURL;
}

// Usage example: Get different random avatar URLs in a list
export function getListOfAvatars(numberOfAvatars: number): string[] {
  const avatarURLs: string[] = [];
  for (let i = 0; i < numberOfAvatars; i++) {
    const randomAvatarURL = getRandomAvatarURL();
    avatarURLs.push(randomAvatarURL);
  }
  return avatarURLs;
}

const numberOfAvatars = 10;
export const avatarURLs = getListOfAvatars(numberOfAvatars);
