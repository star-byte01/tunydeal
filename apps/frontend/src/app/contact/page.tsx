export default function ContactPage() {
  // WhatsApp click-to-chat link
  const whatsappNumber = '+21612345678'; // Replace with actual number
  const whatsappMessage = "Hello TunyDeal! I have a question.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="prose lg:prose-xl">
        <h1>Contact Us</h1>
        <p>
          Have a question? We'd love to hear from you. The fastest way to get in touch is through WhatsApp.
        </p>

        <h2>Via WhatsApp</h2>
        <p>
          Click the link below to start a chat with our customer service team. We are available from 9 AM to 5 PM, Monday to Friday.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-green-500 px-6 py-3 font-bold text-white no-underline hover:bg-green-600"
        >
          Chat with us on WhatsApp
        </a>

        <h2 className="mt-8">Via Email</h2>
        <p>
          You can also reach us by email at <a href="mailto:contact@tunydeal.example.com">contact@tunydeal.example.com</a>. We'll do our best to respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
