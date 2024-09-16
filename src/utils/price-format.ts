export const PriceFormat = (price: number) => {
  if (!price) return price;

  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
