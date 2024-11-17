let products = [
  { id: 1, name: "Proteína", price: 30 },
  { id: 2, name: "Creatina", price: 25 },
];

export const addProduct = (product) => {
  const newProduct = {
    id: products.length + 1,
    ...product,
  };
  products.push(newProduct);
};

export const getProducts = () => {
  return products;
};
