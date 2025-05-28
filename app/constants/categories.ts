// app/constants/categories.ts

type Category = {
  slug: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: 'posude-za-pripremu', image: '/posude-za-pripremu.png' },
  { slug: 'dubai-cokolade',     image: '/dubai-cokolade.png' },
  { slug: 'arapski-parfemi',    image: '/arapski-parfemi.png' },
  { slug: 'orientalni-dekor',   image: '/orientalni-dekor.png' },
  { slug: 'poklon-paketi',      image: '/poklon-paketi.png' },
  { slug: 'recepti',   image: '/recepti.png' },
];
