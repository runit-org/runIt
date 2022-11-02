export const Mention = (text) => {
  const regex = /\B@[a-zA-Z0-9_-]+/gm;
  return (text = text.replace(regex, (match) => {
    return `<a href="/profile?user=${match.substring(1)}">${match}</a>`;
  }));
};
