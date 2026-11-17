import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Mail, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Bot,
  User,
  HeartHandshake
} from 'lucide-react';
import './ChatWidget.css';

// Pre-defined Quick Reply Options as per Section 2
const QUICK_OPTIONS = [
  'Find a Companion',
  'How Unlonely Works',
  'Become a Companion',
  'Pricing and Questions',
  'Speak to Our Team'
];

const INITIAL_GREETING = {
  id: 'msg-1',
  sender: 'bot',
  text: "Hello! Welcome to Unlonely. 😊\n\nI'm your virtual assistant, and I'm here to help you learn more about our companionship service.\n\nAre you looking for companionship for yourself, a family member or someone else? Or would you simply like to know more about how Unlonely works?",
  quickReplies: QUICK_OPTIONS,
  timestamp: new Date()
};

// Response match rules strictly adhering to Sections 3, 4, 7, 8, 9
const getBotResponse = (userText) => {
  const text = userText.toLowerCase().trim();

  // 1. Safety & Crisis Detection (Section 7)
  const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'hurt myself', 'emergency', 'overdose', 'crisis', 'danger'];
  if (crisisKeywords.some(keyword => text.includes(keyword))) {
    return {
      text: "If you or someone you know is in immediate danger or distress, please call emergency services immediately (999 in the UK) or call the Samaritans free anytime on 116 123. Unlonely is a social companionship service and cannot provide crisis or emergency assistance. Please reach out to someone who can help right away.",
      actionLink: null,
      actionText: null,
      showHumanContact: true
    };
  }

  // 2. Specific Approved Common Questions (Section 4)

  // QUESTION: What is Unlonely? / What does Unlonely do?
  if (
    text.includes('what is unlonely') || 
    text.includes('about unlonely') || 
    text.includes('what do you do') || 
    text.includes('what does unlonely do') ||
    text === 'what is this'
  ) {
    return {
      text: "Unlonely is a companionship service designed to help people feel less alone through friendly conversation and social connection. We help connect people with companions who can offer a friendly presence and someone to talk to.",
      quickReplies: ['Find a Companion', 'How Unlonely Works', 'Pricing and Questions']
    };
  }

  // QUESTION: Who is the service for?
  if (
    text.includes('who is the service for') || 
    text.includes('who is this for') || 
    text.includes('who do you support') ||
    text.includes('who can use')
  ) {
    return {
      text: "Unlonely is for people who would appreciate more companionship and social interaction. You can enquire for yourself, a family member or someone you care about.",
      quickReplies: ['Find a Companion', 'Speak to Our Team']
    };
  }

  // QUESTION: Can I arrange companionship for my elderly parent / family member / someone else?
  if (
    text.includes('elderly parent') || 
    text.includes('for my mother') || 
    text.includes('for my mum') || 
    text.includes('for my father') || 
    text.includes('for my dad') || 
    text.includes('for my parent') ||
    text.includes('for someone else') ||
    text.includes('family member') ||
    text.includes('on behalf of') ||
    text === 'someone else' ||
    text === 'family member'
  ) {
    return {
      text: "Absolutely, you can contact us on behalf of a family member. We'd be happy to receive your enquiry and learn a little about the kind of companionship they would appreciate. You can start by completing our Find a Companion form.",
      actionLink: '/find-a-companion',
      actionText: 'Go to Find a Companion',
      quickReplies: ['How Unlonely Works', 'Pricing and Questions']
    };
  }

  // Enquiring for yourself
  if (text === 'for myself' || text === 'myself' || text.includes('for me')) {
    return {
      text: "We would be delighted to help you connect with a friendly, vetted companion. You can start by sharing your interests and preferences on our Find a Companion form, and our team will be in touch with next steps.",
      actionLink: '/find-a-companion',
      actionText: 'Find a Companion'
    };
  }

  // QUESTION: How does the process work? / How Unlonely Works
  if (
    text.includes('how does the process work') || 
    text.includes('how does it work') || 
    text.includes('how unlonely works') ||
    text === 'how unlonely works' ||
    text.includes('process')
  ) {
    return {
      text: "It's simple!\n\n1. Complete our Find a Companion enquiry form.\n2. Our team reviews your information and companionship requirements.\n3. We look for a suitable companion.\n4. Our team contacts you by email to discuss the proposed match and next steps.\n\nAll matching is currently handled by our team.",
      actionLink: '/how-it-works',
      actionText: 'Learn More About How It Works',
      quickReplies: ['Find a Companion', 'Pricing and Questions']
    };
  }

  // QUESTION: How do I find a companion? / Find a Companion
  if (
    text.includes('how do i find a companion') || 
    text.includes('find a companion') || 
    text.includes('get a companion') ||
    text.includes('start companionship') ||
    text.includes('book a companion') ||
    text === 'find a companion'
  ) {
    return {
      text: "Getting started is easy! Simply select Find a Companion on our website and complete the enquiry form. Our team will review your request and contact you about the next steps.",
      actionLink: '/find-a-companion',
      actionText: 'Complete Enquiry Form',
      quickReplies: ['How Unlonely Works', 'Pricing and Questions']
    };
  }

  // QUESTION: How much does it cost? / Pricing and Questions
  if (
    text.includes('how much does it cost') || 
    text.includes('cost') || 
    text.includes('price') || 
    text.includes('pricing') ||
    text.includes('how much is it') ||
    text.includes('fees') ||
    text === 'pricing and questions'
  ) {
    return {
      text: "Our pricing depends on the companionship arrangement. Please contact our team for the latest pricing information so we can guide you accurately.",
      actionLink: '/pricing',
      actionText: 'View Pricing Information',
      quickReplies: ['Speak to Our Team', 'Find a Companion']
    };
  }

  // QUESTION: How long does it take to find a companion?
  if (
    text.includes('how long does it take') || 
    text.includes('timeframe') || 
    text.includes('how fast') || 
    text.includes('how soon')
  ) {
    return {
      text: "Once we receive your enquiry, our team will review your requirements and work on finding a suitable match. We'll contact you by email with an update and the next steps.",
      quickReplies: ['Find a Companion', 'Speak to Our Team']
    };
  }

  // QUESTION: Can I choose my companion?
  if (
    text.includes('can i choose my companion') || 
    text.includes('choose companion') || 
    text.includes('pick my companion') ||
    text.includes('select companion')
  ) {
    return {
      text: "Our team will consider your preferences and requirements when identifying a suitable companion. We'll contact you to discuss the proposed match and next steps.",
      quickReplies: ['Find a Companion', 'How Unlonely Works']
    };
  }

  // QUESTION: Is Unlonely a care service?
  if (
    text.includes('care service') || 
    text.includes('care agency') || 
    text.includes('medical') || 
    text.includes('nursing') || 
    text.includes('personal care') ||
    text.includes('medication')
  ) {
    return {
      text: "Unlonely focuses on social companionship, friendly conversation and connection. We are not a medical, nursing or personal care provider.",
      quickReplies: ['What is Unlonely?', 'Find a Companion']
    };
  }

  // QUESTION: How do I become a companion? / Become a Companion
  if (
    text.includes('how do i become a companion') || 
    text.includes('become a companion') || 
    text.includes('work as a companion') || 
    text.includes('apply as a companion') || 
    text.includes('join as companion') ||
    text === 'become a companion'
  ) {
    return {
      text: "We'd love to hear from people interested in becoming companions! Select Become a Companion on our website and complete the application form. Our team will review your application and contact you about the next steps.",
      actionLink: '/become-a-companion',
      actionText: 'Become a Companion Form',
      quickReplies: ['How Unlonely Works', 'Speak to Our Team']
    };
  }

  // QUESTION: Can I speak to a real person? / Speak to Our Team
  if (
    text.includes('speak to a real person') || 
    text.includes('real person') || 
    text.includes('human') || 
    text.includes('speak to our team') || 
    text.includes('speak to the team') || 
    text.includes('talk to someone') || 
    text.includes('phone number') || 
    text.includes('contact support') ||
    text === 'speak to our team'
  ) {
    return {
      text: "Of course! You can reach our team through the contact options available on this website. Choose SMS/Email or Voice to continue with a human contact option.",
      actionLink: '/contact',
      actionText: 'Contact Options Page',
      showHumanContact: true
    };
  }

  // Greetings
  if (text === 'hello' || text === 'hi' || text === 'hey' || text.startsWith('hello') || text.startsWith('good morning') || text.startsWith('good afternoon')) {
    return {
      text: "Hello! It's lovely to meet you. How can I help you today with learning about our companionship service?",
      quickReplies: QUICK_OPTIONS
    };
  }

  // Closings & Thank yous (Section 9)
  if (text.includes('thank you') || text.includes('thanks') || text === 'cheers') {
    return {
      text: "You're very welcome! We're glad you reached out to Unlonely. If you have any more questions, we're always happy to help. 😊",
      quickReplies: ['Find a Companion', 'Speak to Our Team']
    };
  }

  if (text.includes('bye') || text.includes('goodbye') || text.includes('see you')) {
    return {
      text: "Thank you for considering Unlonely. We look forward to helping you take the next step. Have a wonderful day!"
    };
  }

  // 3. Fallback when AI does not know an answer (Section 8)
  return {
    text: "That's a good question. I don't want to give you incorrect information. Our team will be better placed to confirm that for you. Please use one of the contact options here and they'll be happy to help.",
    actionLink: '/contact',
    actionText: 'Speak to Our Team',
    showHumanContact: true
  };
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Show welcome popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // When chat is clicked/opened, show messages from the top!
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setShowPopup(false);
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
      }
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // When new messages arrive while open, scroll down smoothly
  useEffect(() => {
    if (isOpen && messages.length > 1) {
      scrollToBottom();
    }
  }, [messages.length, isTyping]);

  const handleSendMessage = (userMessageText) => {
    const trimmed = userMessageText.trim();
    if (!trimmed) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic typing delay (450ms)
    setTimeout(() => {
      const botReply = getBotResponse(trimmed);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply.text,
        actionLink: botReply.actionLink,
        actionText: botReply.actionText,
        quickReplies: botReply.quickReplies,
        showHumanContact: botReply.showHumanContact,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleQuickReply = (replyText) => {
    handleSendMessage(replyText);
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_GREETING,
        id: `msg-${Date.now()}`,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="unlonely-chat-widget">
      {/* Floating Launcher Button & Pop Up Message */}
      {!isOpen && (
        <div className="chat-launcher-container">
          {showPopup && (
            <div 
              className="chat-popup-bubble animate-fade-in" 
              onClick={() => {
                setIsOpen(true);
                setShowPopup(false);
              }}
              role="button"
              tabIndex={0}
              aria-label="Welcome popup, click to open chat"
            >
              <div className="chat-popup-content">
                <span className="chat-popup-wave">👋</span>
                <p className="chat-popup-text">
                  Welcome to Unlonely, how may I assist you?
                </p>
              </div>
              <button 
                type="button" 
                className="chat-popup-close" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                aria-label="Dismiss greeting"
                title="Dismiss"
              >
                <X size={13} />
              </button>
              <div className="chat-popup-arrow"></div>
            </div>
          )}

          <button 
            className="chat-launcher-btn"
            onClick={() => {
              setIsOpen(true);
              setShowPopup(false);
            }}
            aria-label="Open Unlonely Virtual Assistant"
          >
            <div className="chat-launcher-icon-wrapper">
              <img src="/chatbot-avatar.jpg" alt="Unlonely Assistant" className="chat-launcher-avatar" />
              {hasUnread && <span className="chat-unread-badge" />}
            </div>
            <span className="chat-launcher-tooltip">Chat with us</span>
          </button>
        </div>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className="chat-window animate-scale-up" role="dialog" aria-label="Unlonely Support Chat">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar-wrapper">
                <img src="/chatbot-avatar.jpg" alt="Unlonely Assistant" className="chat-header-avatar" />
                <span className="chat-status-dot" title="Online" />
              </div>
              <div className="chat-header-text">
                <h3 className="chat-header-title">Unlonely Assistant</h3>
                <span className="chat-header-tagline">Alone no more • Virtual Support</span>
              </div>
            </div>

            <div className="chat-header-actions">
              <button 
                className="chat-icon-btn" 
                onClick={handleResetChat} 
                title="Restart conversation"
                aria-label="Restart chat"
              >
                <RotateCcw size={17} />
              </button>
              <button 
                className="chat-icon-btn" 
                onClick={() => setIsOpen(false)} 
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Human Contact Quick Bar - Only Icons for Phone and Message */}
          <div className="chat-human-bar">
            <span className="chat-human-label">Need a real person?</span>
            <div className="chat-human-options">
              <a 
                href="tel:08001234567" 
                className="chat-human-icon-btn" 
                title="Call our team: 0800 123 4567"
                aria-label="Call 0800 123 4567"
              >
                <Phone size={15} />
              </a>
              <Link 
                to="/contact" 
                className="chat-human-icon-btn" 
                onClick={() => setIsOpen(false)}
                title="Send Message / Email"
                aria-label="Send message to our team"
              >
                <Mail size={15} />
              </Link>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chat-messages-container" ref={messagesContainerRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                {msg.sender === 'bot' && (
                  <div className="chat-msg-avatar">
                    <img src="/chatbot-avatar.jpg" alt="Unlonely Assistant" className="chat-avatar-img" />
                  </div>
                )}

                <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <div className="chat-bubble-text">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph.split('\n').map((line, lIdx) => (
                          <React.Fragment key={lIdx}>
                            {line}
                            {lIdx < paragraph.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ))}
                  </div>

                  {/* Primary In-Bubble Action Link */}
                  {msg.actionLink && (
                    <div className="chat-action-wrapper">
                      <Link 
                        to={msg.actionLink} 
                        className="chat-action-btn"
                        onClick={() => setIsOpen(false)}
                      >
                        {msg.actionText} <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}

                  {/* Human Contact Tray if requested */}
                  {msg.showHumanContact && (
                    <div className="chat-contact-tray">
                      <p className="tray-title">Choose how you'd like to reach our team:</p>
                      <div className="tray-buttons">
                        <a href="tel:08001234567" className="tray-btn voice">
                          <Phone size={15} /> Voice: 0800 123 4567
                        </a>
                        <Link to="/contact" className="tray-btn message" onClick={() => setIsOpen(false)}>
                          <Mail size={15} /> SMS / Email Form
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Suggested Quick Replies */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="chat-quick-replies">
                      {msg.quickReplies.map((option, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="quick-reply-pill"
                          onClick={() => handleQuickReply(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message-row bot-row">
                <div className="chat-msg-avatar">
                  <img src="/chatbot-avatar.jpg" alt="Unlonely Assistant" className="chat-avatar-img" />
                </div>
                <div className="chat-bubble bot-bubble typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form className="chat-input-bar" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input-field"
              placeholder="Type a message or question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Type message"
            />
            <button 
              type="submit" 
              className="chat-send-btn"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>

          {/* Reassurance Micro-Footer */}
          <div className="chat-micro-footer">
            <span>Non-clinical companionship • <Link to="/safety" onClick={() => setIsOpen(false)}>Safeguarding</Link></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
