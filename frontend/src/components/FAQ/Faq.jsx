import React, { useState, useRef, useEffect } from 'react';
import './Faq.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function FAQ()
{
  const [activeIndex, setActiveIndex] = useState(null);
  const [heights, setHeights] = useState({});
  const answerRefs = useRef([]);

  useEffect(() =>
  {
    const newHeights = {};
    answerRefs.current.forEach((ref, index) =>
    {
      if (ref)
      {
        newHeights[index] = ref.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, []);

  const toggleFAQ = (index) =>
  {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is TrackIt and how does it work?',
      answer: 'TrackIt is an IP tracking platform that allows you to monitor IP addresses, track locations in real-time, and gain valuable insights into user behavior through analytics.',
    },
    {
      question: 'Is my data secure with TrackIt?',
      answer: 'Yes, we use state-of-the-art encryption to ensure your IP tracking data is always secure and protected against any unauthorized access.',
    },
    {
      question: 'Can I access TrackIt on mobile devices?',
      answer: 'Absolutely! TrackIt is fully responsive and optimized for mobile devices, so you can access all features on the go.',
    },
    {
      question: 'How often is the data updated?',
      answer: 'Our system provides real-time updates, ensuring that the data you receive is accurate and up-to-date at all times.',
    },
    {
      question: 'Do you offer API integration?',
      answer: 'Yes, we offer seamless API integration to help you integrate our IP tracking system into your existing platforms.',
    },
  ]

  return (
    <section className="faq-section" id="faq">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              {activeIndex === index ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
            </div>
            <div
              className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
              style={{ height: activeIndex === index ? heights[index] + 'px' : '0px' }}
              ref={el => answerRefs.current[index] = el}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;

// CSS (Faq.css)
