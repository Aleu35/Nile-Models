
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = () => {
  const modelFAQs = [
    {
      question: "How do I apply to become a model with NILES?",
      answer: "You can apply through our online application form. We require basic information, measurements, and recent photos. Our talent scouts review all applications and will contact you if there's a potential fit."
    },
    {
      question: "What are the height and age requirements?",
      answer: "For fashion modeling: Women 5'8\" and above, Men 6'0\" and above. For commercial work, we're more flexible. Age ranges from 16-35, though we occasionally work with talent outside this range for specific projects."
    },
    {
      question: "Do I need professional photos to apply?",
      answer: "No professional photos are required for your initial application. Clear, well-lit snapshots showing your face and full body are sufficient. Once signed, we'll help develop your professional portfolio."
    },
    {
      question: "What does representation include?",
      answer: "We provide career guidance, portfolio development, casting submissions, contract negotiations, and ongoing support throughout your modeling career. We handle all business aspects so you can focus on your craft."
    },
    {
      question: "How are bookings and payments handled?",
      answer: "We submit you for castings and negotiate all terms. Payment is handled through our agency - clients pay us, and we pay you minus our commission (typically 15-20% industry standard)."
    }
  ];

  const clientFAQs = [
    {
      question: "How do I book models for my project?",
      answer: "Contact us with your project details, including dates, location, budget, and model specifications. We'll provide suitable model options within 24-48 hours."
    },
    {
      question: "What are your rates?",
      answer: "Rates vary based on the model's experience, project scope, usage rights, and duration. We provide transparent pricing and can work within various budget ranges."
    },
    {
      question: "Do you provide models for international projects?",
      answer: "Yes, we frequently arrange international bookings. We handle all logistics including visas, work permits, and travel arrangements for our models."
    },
    {
      question: "What's included in a model booking?",
      answer: "Standard bookings include the model's time for the agreed duration. Additional services like styling, makeup, or extended usage rights may incur additional fees."
    },
    {
      question: "How far in advance should I book?",
      answer: "For best selection, book 2-4 weeks in advance. However, we can often accommodate last-minute requests depending on model availability."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-900 to-black py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-light mb-6 tracking-[0.2em] uppercase">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about working with NILES Models
            </p>
          </div>
        </div>

        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* For Models */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-2xl font-light tracking-wider">For Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    {modelFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`model-${index}`} className="border-gray-700">
                        <AccordionTrigger className="text-white text-left hover:text-gray-300">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* For Clients */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-2xl font-light tracking-wider">For Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    {clientFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`client-${index}`} className="border-gray-700">
                        <AccordionTrigger className="text-white text-left hover:text-gray-300">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Still Have Questions */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-white text-2xl font-light mb-4 tracking-wider">Still Have Questions?</h3>
                  <p className="text-gray-300 mb-6">
                    Can't find what you're looking for? Our team is here to help with any additional questions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/contact" 
                      className="bg-white text-black px-6 py-3 font-light tracking-wider uppercase hover:bg-gray-200 transition-colors text-center"
                    >
                      Contact Us
                    </a>
                    <a 
                      href="mailto:info@nilesmodels.com" 
                      className="border border-gray-600 text-white px-6 py-3 font-light tracking-wider uppercase hover:bg-gray-800 transition-colors text-center"
                    >
                      Email Directly
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
