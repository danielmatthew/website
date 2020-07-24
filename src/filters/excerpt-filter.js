module.exports = function excerpt(content) {
  const excerptMinimumLength = 80;
  const excerptSeparator = '<!--more-->';
  const findExcerptEnd = (content) => {
    if (content === '') {
      return 0;
    }

    const paragraphEnd = content.indexOf('</p>', 0) + 4;

    if (paragraphEnd < excerptMinimumLength) {
      return (
        paragraphEnd +
        findExcerptEnd(content.substring(paragraphEnd), paragraphEnd)
      );
    }

    return paragraphEnd;
  };

  if (!content) {
    return;
  }

  if (content.includes(excerptSeparator)) {
    return content.substring(0, content.indexOf(excerptSeparator));
  } else if (content.length <= excerptMinimumLength) {
    return content;
  }

  const excerptEnd = findExcerptEnd(content);

  return content.substring(0, excerptEnd);
};
