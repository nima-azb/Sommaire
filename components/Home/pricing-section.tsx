import Link from "next/link";

type PriceType = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const plans = [
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
    paymentLink: "",

    priceId: "",
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
    paymentLink: "",
    priceId: "",
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg">
      <div>
        <p>{name}</p>
        <p>{description}</p>
      </div>
      <div>
        <p>{price}</p>
      </div>
      <div>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </div>
      <div>
        <Link href={paymentLink}>Buy Now</Link>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 lg:pt-12">
        <div>
          <h2>Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8 ">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
