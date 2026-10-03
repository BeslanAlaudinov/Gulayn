/**
 * Путь к файлу из public с учётом basePath.
 * На GitHub Pages сайт живёт по адресу /<репозиторий>/, и абсолютные пути без префикса ломаются.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
