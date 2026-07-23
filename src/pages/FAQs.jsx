import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQs = () => {
  const faqs = [
    {
      question: "What exactly does a companion do?",
      answer: "A companion provides social interaction and non-medical support. This can range from having a cup of tea and a chat at home, playing board games, going for a walk, or accompanying you to a museum or appointment."
    },
    {
      question: "Is Unlonely a care agency?",
      answer: "No. We provide strictly non-medical companionship. Our companions cannot assist with personal care (like bathing or dressing), administering medication, or providing nursing care."
    },
    {
      question: "Are your companions background checked?",
      answer: "Absolutely. Every companion undergoes an Enhanced DBS check, identity verification, and referencing before they are accepted onto our platform."
    },
    {
      question: "How do you match companions with clients?",
      answer: "We look at shared interests, personality traits, and location. During your initial consultation, we learn about what you're looking for to ensure a meaningful connection."
    },
    {
      question: "Can I book a companion for a family member?",
      answer: "Yes, many of our bookings are made by family members on behalf of loved ones. We keep you updated and ensure you're part of the onboarding process."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel a booked visit up to 24 hours in advance without any charge. Cancellations within 24 hours may be subject to a fee."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="animate-fade-in section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="text-center mb-lg">Frequently Asked Questions</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{
                backgroundColor: '#fff',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--primary-color)'
                }}
              >
                {faq.question}
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openIndex === index && (
                <div style={{ 
                  padding: '0 1.5rem 1.5rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
