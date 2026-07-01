export const legalKnowledge = [
  {
    id: 'constitution-supremacy',
    title: 'Constitutional supremacy and rule of law',
    source: 'Constitution of Georgia',
    sourceUrl: 'https://matsne.gov.ge/en/document/view/30346',
    summary:
      'Georgia is a democratic republic and a legal state. State authority must operate within the Constitution and law, and the Constitution is the supreme law of the state.',
  },
  {
    id: 'human-rights',
    title: 'Human rights as directly applicable law',
    source: 'Constitution of Georgia',
    sourceUrl: 'https://matsne.gov.ge/en/document/view/30346',
    summary:
      'The state recognises and protects universally recognised human rights and freedoms. Public authorities are bound by those rights when exercising power.',
  },
  {
    id: 'equality',
    title: 'Equality and non-discrimination',
    source: 'Constitution of Georgia',
    sourceUrl: 'https://matsne.gov.ge/en/document/view/30346',
    summary:
      'People are equal before the law. Claims involving government action, public services, elections, or policing should be checked for unequal treatment or discrimination.',
  },
  {
    id: 'expression-media',
    title: 'Expression, information, and media freedom',
    source: 'Constitution of Georgia',
    sourceUrl: 'https://matsne.gov.ge/en/document/view/30346',
    summary:
      'Freedom of expression, access to information, and media pluralism are constitutionally important. News claims should distinguish opinion, evidence, and restrictions that may require lawful justification.',
  },
  {
    id: 'fair-process',
    title: 'Due process and fair trial protections',
    source: 'Constitution of Georgia',
    sourceUrl: 'https://matsne.gov.ge/en/document/view/30346',
    summary:
      'Accusations about criminal liability, courts, arrests, or sanctions should be checked against fair process, lawful basis, and the presumption that legal conclusions require competent authority.',
  },
];

export function selectLegalContext(stories) {
  const text = stories
    .map((story) => `${story.headline || ''} ${story.summary || ''} ${story.topic || ''}`)
    .join(' ')
    .toLowerCase();

  const selected = legalKnowledge.filter((item) => {
    if (item.id === 'constitution-supremacy' || item.id === 'human-rights') return true;
    if (item.id === 'equality') return /equal|discrimin|minority|citizen|service|election/.test(text);
    if (item.id === 'expression-media') return /media|journal|speech|information|news|source/.test(text);
    if (item.id === 'fair-process') return /court|criminal|arrest|police|sanction|trial|accus/.test(text);
    return false;
  });

  return selected.length > 0 ? selected : legalKnowledge.slice(0, 2);
}
