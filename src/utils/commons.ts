export const capitalizeString = (str: string): string => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};

export function stringAvatar(name: string, mark: number) {
  return {
    sx: {
      bgcolor: mark >= 8 ? '#0ab4ae' : mark >= 4 ? '#90d1d1' : '#c4a4d0',
      fontSize: '16px',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
