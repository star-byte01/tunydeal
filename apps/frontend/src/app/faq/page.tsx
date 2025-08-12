export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="prose lg:prose-xl">
        <h1>Frequently Asked Questions (FAQ)</h1>

        <h2>Ordering</h2>
        <dl>
          <dt>How do I place an order?</dt>
          <dd>Simply browse our products, add items to your cart, and proceed to checkout. Fill in your name, phone number, and address, and click "Order Now".</dd>

          <dt>What payment methods do you accept?</dt>
          <dd>We only accept Cash on Delivery (COD). You pay the delivery person when you receive your order.</dd>
        </dl>

        <h2>Shipping</h2>
        <dl>
          <dt>How long does delivery take?</dt>
          <dd>Delivery typically takes 1-5 business days, depending on your location in Tunisia.</dd>

          <dt>How can I track my order?</dt>
          <dd>Once your order is shipped, you will receive an SMS with tracking information. You can also look up your order status on our website using your order ID and phone number.</dd>
        </dl>

        <h2>Returns</h2>
        <dl>
          <dt>What is your return policy?</dt>
          <dd>You can return most items within 7 days of receipt for a full refund, as long as they are in their original condition. Please see our Shipping & Returns page for more details.</dd>
        </dl>
      </div>
    </div>
  );
}
