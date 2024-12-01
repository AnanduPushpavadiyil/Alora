const htmlEntities: Record<string, string> = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: "'",
};

function unescapeHTML(str: string): string {
  return str.replace(/&([^;]+);/g, function (entity, entityCode): string {
    let match: RegExpMatchArray | null;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
    }

    if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
      return String.fromCharCode(parseInt(match[1], 16));
    }

    if ((match = entityCode.match(/^#(\d+)$/))) {
      return String.fromCharCode(Number(match[1]));
    }

    return entity;
  });
}

export default unescapeHTML;
