import { isDev } from "./helpers";

export const pricingPlans = [
  {
    id: "basic",
    name: "basic",
    description: "Perfect for occasional use",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink: "https://buy.stripe.com/test_bJecN4bgagP20Hr4mL1sQ00",
    priceId: "price_1TdUYPAPUPSQPcdo32rlenZA",
  },
  {
    id: "pro",
    name: "pro",
    description: "For professionals and teams",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: "https://buy.stripe.com/test_7sY7sK0BwfKYbm56uT1sQ01",

    priceId: "price_1TdUYPAPUPSQPcdoFPsrlvoS",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      easing: "ease-out",
    },
  },
};

export const buttonVariants = {
  scale: 1.05,
  transition: {
    duration: 0.25,
    easing: "ease-out",
  },
};

export const listVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      easing: "ease-out",
    },
  },
};
