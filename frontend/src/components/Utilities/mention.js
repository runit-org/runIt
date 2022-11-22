export const Mention = (text) => {
  const regex = /\B@[a-zA-Z0-9_-]+/gm;
  return (text = text.replace(regex, (match) => {
    return `<a id="test"  href=${
      match !== "@everyone" ? `/profile?user=${match.substring(1)}` : `#`
    } >${match}</a>`;
  }));
};

export const MentionFilter = (text) => {
  var matchingText = text.match(/\B@[a-zA-Z0-9_-]+/gm);
  var parse = matchingText
    ? matchingText.map((val) => {
        return val.replace("@", "");
      })
    : "";

  return parse;
};
