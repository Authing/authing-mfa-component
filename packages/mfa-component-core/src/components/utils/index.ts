export const getClassnames = (classnames: (string | boolean | undefined)[]) => {
  return classnames.filter(Boolean).join(' ')
}
