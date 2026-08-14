export type Product = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'clasico',
    title: 'Nido + Set de Cuna + Chichonera',
    desc: 'El favorito de las familias. Incluye todo lo necesario para la comidad tuya y de tu bebé.',
    image: '/images/nido-clasico.jpg',
  },
  {
    id: 'natural',
    title: 'Set de Cuna',
    desc: 'Confeccionado con algodón 100% orgánico. Pensado para las pieles más sensibles.',
    image: '/images/nido-natural.jpg',
  },
  {
    id: 'personalizado',
    title: 'Nido + Set de Cuna',
    desc: 'Elige la tela, el nombre y el color. Un nido único, hecho especialmente para tu bebé.',
    image: '/images/nido-personalizado.jpg',
  },
];