import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
  {
    id: 1,
    name: 'The Solitaire Ring',
    price: 2400,
    image: '/assets/product_ring.jpg',
    description: 'A stunning solitaire diamond ring set in 18k white gold. This piece is the epitome of elegance and timeless beauty, perfect for engagements or special anniversaries.',
    details: 'Diamond: 1 Carat, Color: G, Clarity: VS1. Band: 18k White Gold.',
    stock: 5,
  },
  {
    id: 2,
    name: 'Aurelia Timepiece',
    price: 5800,
    image: '/assets/product_watch.jpg',
    description: 'Classic luxury timepiece with a timeless design. Crafted with precision engineering and a sapphire crystal dial.',
    details: 'Movement: Automatic. Case: Stainless Steel. Water Resistance: 50m.',
    stock: 3,
  },
  {
    id: 3,
    name: 'Pearl Drop Earrings',
    price: 1200,
    image: '/assets/product_earrings.jpg',
    description: 'Elegant pearl drop earrings for any occasion. These lustrous South Sea pearls bring a touch of sophistication to any outfit.',
    details: 'Pearl: South Sea Cultured, 9mm. Metal: 14k Yellow Gold.',
    stock: 10,
  },
  {
    id: 4,
    name: 'Diamond Tennis Bracelet',
    price: 4500,
    image: '/assets/product_bracelet.jpg',
    description: 'A dazzling tennis bracelet featuring continuous diamonds. Meticulously matched diamonds set in a secure prong setting.',
    details: 'Total Carat Weight: 3.5. Metal: 18k White Gold. Clasp: Hidden Box.',
    stock: 2,
  },
  {
    id: 5,
    name: 'Emerald Cut Necklace',
    price: 3200,
    image: '/assets/product_necklace.jpg',
    description: 'A sophisticated emerald cut diamond pendant. The step-cut faceting emphasizes the diamond\'s pure clarity.',
    details: 'Center Stone: Emerald Cut, 1.2 Carat. Chain: 18 inches, Platinum.',
    stock: 4,
  },
  {
    id: 6,
    name: 'Sapphire Halo Ring',
    price: 2800,
    image: '/assets/product_sapphire_ring.jpg',
    description: 'A vibrant blue sapphire surrounded by a brilliant diamond halo. The deep blue hue is perfectly complemented by the sparkling accents.',
    details: 'Center Stone: Blue Sapphire, 2 Carats. Halo: Round diamonds (0.5tcw).',
    stock: 6,
  },
  {
    id: 7,
    name: 'Gold Hoop Earrings',
    price: 800,
    image: '/assets/product_hoop.jpg',
    description: 'Classic 14k gold hoop earrings, a wardrobe staple. Lightweight and versatile for everyday wear.',
    details: 'Diameter: 40mm. Metal: 14k Solid Yellow Gold.',
    stock: 15,
  },
  {
    id: 8,
    name: 'Vintage Brooch',
    price: 1500,
    image: '/assets/product_brooch.jpg',
    description: 'An exquisite vintage-inspired floral brooch. A unique statement piece to adorn jackets and lapels.',
    details: 'Gemstones: Mixed colored sapphires and diamonds. Metal: 18k Yellow Gold.',
    stock: 1,
  },
  {
    id: 9,
    name: 'Rose Gold Bangle',
    price: 2100,
    image: '/assets/product_bangle.jpg',
    description: 'A sleek and modern rose gold bangle. Can be worn alone or stacked for a bolder look.',
    details: 'Metal: 18k Rose Gold. Closure: Hidden slide clasp.',
    stock: 8,
  },
  {
    id: 10,
    name: 'Ruby Pendant Necklace',
    price: 1950,
    image: '/assets/product_ruby.jpg',
    description: 'A rich red ruby pendant on a delicate chain. Symbolizing passion and love.',
    details: 'Center Stone: Ruby, 1 Carat. Chain: 18k Yellow Gold.',
    stock: 7,
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
  const updateProduct = (id, updatedProduct) => setProducts(products.map(p => p.id === id ? updatedProduct : p));
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
