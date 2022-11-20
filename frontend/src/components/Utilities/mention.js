export const Mention = (text) => {
  const regex = /\B@[a-zA-Z0-9_-]+/gm;
  return (text = text.replace(regex, (match) => {
    return `<a id="test"  href=${
      match !== "@everyone" ? `/profile?user=${match.substring(1)}` : `#`
    } >${match}</a>`;
  }));
};
