import { AllHtmlEntities } from 'html-entities';

const entities = new AllHtmlEntities();

export default function cleanText(str) {
  return entities.decode(str);
}
