export type CarModel = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  range: number;
  topSpeed: number;
  zeroToSixty: number;
};

export const models: CarModel[] = [
  {
    id: "model-s",
    name: "Model S",
    tagline: "Plaid performance, everyday comfort",
    price: 74990,
    image: "/images/model-s.jpg",
    range: 402,
    topSpeed: 200,
    zeroToSixty: 1.99,
  },
  {
    id: "model-3",
    name: "Model 3",
    tagline: "The electric sedan for everyone",
    price: 38990,
    image: "/images/model-3.jpg",
    range: 363,
    topSpeed: 163,
    zeroToSixty: 2.9,
  },
  {
    id: "model-x",
    name: "Model X",
    tagline: "Falcon-wing doors, room for seven",
    price: 79990,
    image: "/images/model-x.jpg",
    range: 335,
    topSpeed: 163,
    zeroToSixty: 2.5,
  },
  {
    id: "model-y",
    name: "Model Y",
    tagline: "Versatile SUV, built for adventure",
    price: 44990,
    image: "/images/model-y.jpg",
    range: 330,
    topSpeed: 155,
    zeroToSixty: 3.5,
  },
];

export function getModel(id: string) {
  return models.find((m) => m.id === id);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
