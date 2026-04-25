export function getDocumentTitle(pageTitle?: string | null) {
  if (!pageTitle) {
    return 'Wallet';
  }
  return `Wallet · ${pageTitle}`;
}
