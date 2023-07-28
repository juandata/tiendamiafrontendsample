// @ts-nocheck
import { InterfaceItems } from '../types';
import hoodie from '../images/hoodie.jpg';
import pants from '../images/pants.webp';
import leatherJacket from '../images/leatherJacket.webp';
import womenDress from '../images/womenDress.webp';
import tshirt from '../images/tshirt.jpg';
const itemsMockData: Array<InterfaceItems> = [
  {
    id: '454546',
    title: 'Hoodie',
    description: 'This classic hoodie from Element is great all year round. Ideal for layering.',
    url: 'Item url',
    price: 120,
    quantity: 0,
    image: hoodie,
  },
  {
    id: '4545432',
    title: 'Trousers',
    description:
      '7oz natural cotton duck fabric. Hand-stiched front center line. Clean tailored finishing on waistband and seams. Two rounded patch pockets with flap on back. Invisible hem',
    url: 'Item url',
    price: 85,
    quantity: 0,
    image: pants,
  },
  {
    id: '34353',
    title: 'Motorcycle Jacket',
    description:
      'Effortlessly cool and supremely functional, a motorcycle jacket is a wardrobe essential. Our thoughtful design approach can only be truly appreciated once you put it on. Five pockets, a perfect fit, and handmade with the highest quality materials to last a lifetime.',
    url: 'Item url',
    price: 850,
    quantity: 0,
    image: leatherJacket,
  },
  {
    id: '34353',
    title: 'Women Fit and Flare Black Dress',
    description:
      'Boasting a stylish A-line design and fit and flare style, the Purshottam Wala Women’s Printed A-line Fit and Flare Dress will become your favourite choice for parties and festive occasions. And, its fit and flare design makes this dress flared from the waist down, for a feminine and chic look.',
    url: 'Item url',
    price: 241,
    quantity: 0,
    image: womenDress,
  },
  {
    id: '34353',
    title: 'Women Fit and Flare Black Dress',
    description:
      'Short-sleeved T-shirt, made with fine gauge fabric and compacted finish. Round neck with 4 layers, reinforced seam covers on the neck and shoulders and side seams. 100% combed cotton, single jersey, 180 g/m2..',
    url: 'Item url',
    price: 146,
    quantity: 0,
    image: tshirt,
  },
];

export { itemsMockData };
