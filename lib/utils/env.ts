export const isDemoMode = () => {
  console.log(
    "🚀 ~ isDemoMode ~ !process.env.NEXT_PUBLIC_CUSTOMER_API || !process.env.NEXT_PUBLIC_STORE_ID:",
    process.env.NEXT_PUBLIC_CUSTOMER_API,
    process.env.NEXT_PUBLIC_STORE_ID
  );
  return (
    !process.env.NEXT_PUBLIC_CUSTOMER_API || !process.env.NEXT_PUBLIC_STORE_ID
  );
};

export const getCheckoutUrl = () => {
  return process.env.NEXT_PUBLIC_CHECKOUT_URL || "https://checkout.monmi.com";
};

export const getPlaceholderImage = () => {
  return "https://media.licdn.com/dms/image/v2/D560BAQG24EEpNjgomQ/company-logo_100_100/B56Zesjc2gGQAQ-/0/1750946664328?e=1767225600&v=beta&t=FVF-2FPO-Iz1IA6m0OYNbr74rkfwzbStBXbKjpahCqk";
};
