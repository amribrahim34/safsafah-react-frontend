import { IMG } from "./images";


export const PRODUCTS = [
  { 
    id: 1,
    brand: "some-by-mi",
    tags: ["retinol", "collection:winter-hydration"],
    name: { en: "Some By Mi Retinol Serum", ar: "سيروم ريتينول سوم باي مي" },
    price: 590,
    rating: 4.7,
    img: IMG.serum,
    images: [IMG.serum, IMG.retinolSerum]
  },
  { 
    id: 2,
    brand: "some-by-mi",
    tags: ["acids", "exfoliation"],
    name: { en: "Some By Mi Acids Serum", ar: "سيروم أحماض سوم باي مي" },
    price: 420,
    rating: 4.6,
    img: IMG.cleanser,
    images: [IMG.cleanser, IMG.acidsSerum, IMG.acidsSerumAlt]
  },
  { 
    id: 3,
    brand: "some-by-mi",
    tags: ["retinol", "eye-care"],
    name: { en: "Some By Mi Retinol Eye Cream", ar: "كريم عيون ريتينول سوم باي مي" },
    price: 760,
    rating: 4.8,
    img: IMG.cream,
    images: [IMG.cream, IMG.retinolEyeCream]
  },
  { 
    id: 4,
    brand: "premium",
    tags: ["gift-set", "collection:winter-hydration"],
    name: { en: "Premium Skincare Set", ar: "مجموعة العناية بالبشرة المميزة" },
    price: 650,
    rating: 4.5,
    img: IMG.oils,
    images: [IMG.oils, IMG.makeup]
  },
];
