import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, Settings, HelpCircle, Zap, Heart, Star, Coffee } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: string;
}

const quickOptions: QuickOption[] = [
  { id: '1', label: 'Get Started', icon: <Zap className="w-4 h-4" />, category: 'general' },
  { id: '2', label: 'Supported KPIs', icon: <Star className="w-4 h-4" />, category: 'general' },
  { id: '3', label: 'Features', icon: <Heart className="w-4 h-4" />, category: 'general' },
  { id: '4', label: 'Support', icon: <HelpCircle className="w-4 h-4" />, category: 'help' },
  { id: '5', label: 'Account Settings', icon: <Settings className="w-4 h-4" />, category: 'help' },
  { id: '6', label: 'Suggestions', icon: <Coffee className="w-4 h-4" />, category: 'feedback' },
];

const predefinedResponses = [
  "Tell me about supported KPIs",
  "How do I get started?",
  "What features are available?",
  "I need technical support",
  "Reports"
];

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [incidentId, setIncidentId] = useState<string | null>(null);
  const [facilityId, setFacilityId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get incidentId and facilityId from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const incidentIdParam = urlParams.get('incidentId');
    const facilityIdParam = urlParams.get('facilityId');
    
    if (incidentIdParam) {
      setIncidentId(incidentIdParam);
    }
    
    if (facilityIdParam) {
      setFacilityId(facilityIdParam);
    }
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    if (lowerText.includes('kpi') || lowerText.includes('metrics') || lowerText.includes('supported')) {
      return "We support a comprehensive range of KPIs including revenue metrics, customer acquisition cost, lifetime value, conversion rates, engagement metrics, and operational efficiency indicators. Would you like details on specific KPI categories?";
    } else if (lowerText.includes('started') || lowerText.includes('begin')) {
      return "Getting started is easy! First, create your account, then you can explore our onboarding tutorials. I can guide you through the setup process step by step.";
    } else if (lowerText.includes('features')) {
      return "We offer a comprehensive suite of features including real-time collaboration, advanced analytics, automated workflows, and seamless integrations. What specific functionality are you most interested in?";
    } else if (lowerText.includes('support') || lowerText.includes('help')) {
      return "Our support team is here 24/7 to help you succeed. You can reach us through this chat, email, or schedule a call with one of our specialists. What do you need assistance with?";
    } else if (lowerText.includes('report') || lowerText.includes('analytics') || lowerText.includes('dashboard')) {
      return "Our reporting system provides comprehensive analytics with customizable dashboards, automated report generation, real-time data visualization, and export capabilities. You can create detailed reports on all your KPIs and metrics. What type of reports are you interested in?";
    } else if (lowerText.includes('suggestion') || lowerText.includes('feedback') || lowerText.includes('improve')) {
      return "We value your feedback and suggestions! Your input helps us improve our product and better serve our users. What suggestions do you have for us, or what feedback would you like to share?";
    }
    return "Thanks for your message! I'm here to help with any questions about our product, KPIs, features, or support. What would you like to know more about?";
  };

  const handleQuickOptionClick = (option: QuickOption) => {
    let message = '';
    switch (option.label) {
      case 'Get Started':
        message = 'How do I get started with your platform?';
        break;
      case 'Supported KPIs':
        message = 'What KPIs and metrics do you support?';
        break;
      case 'Features':
        message = 'What features does your product offer?';
        break;
      case 'Support':
        message = 'I need help with technical support';
        break;
      case 'Account Settings':
        message = 'How do I manage my account settings?';
        break;
      case 'Suggestions':
        message = 'I have some suggestions and feedback to share';
        break;
      default:
        message = option.label;
    }
    sendMessage(message);
  };

  const handlePredefinedResponse = (response: string) => {
    sendMessage(response);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex overflow-hidden relative">
      {/* ID Display - Top Right Corner */}
      {(incidentId || facilityId) && (
        <div className="absolute top-4 right-4 z-50 space-y-2">
          {incidentId && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Incident ID: <span className="font-mono text-orange-600">{incidentId}</span>
                </span>
              </div>
            </div>
          )}
          {facilityId && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Facility ID: <span className="font-mono text-blue-600">{facilityId}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Left Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200 p-6 flex flex-col overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              AI-Chat-Bot
            </h1>
          </div>
          <p className="text-gray-600 text-sm">Choose from quick options below or start typing</p>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">General</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickOptions.filter(opt => opt.category === 'general').map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleQuickOptionClick(option)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-pink-50 border border-gray-100 hover:border-pink-200 transition-all duration-200 hover:shadow-sm group"
                >
                  <div className="text-pink-500 group-hover:text-pink-600 transition-colors">
                    {option.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700 transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Help & Support</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickOptions.filter(opt => opt.category === 'help').map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleQuickOptionClick(option)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-pink-50 border border-gray-100 hover:border-pink-200 transition-all duration-200 hover:shadow-sm group"
                >
                  <div className="text-pink-500 group-hover:text-pink-600 transition-colors">
                    {option.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700 transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Feedback</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickOptions.filter(opt => opt.category === 'feedback').map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleQuickOptionClick(option)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-pink-50 border border-gray-100 hover:border-pink-200 transition-all duration-200 hover:shadow-sm group"
                >
                  <div className="text-pink-500 group-hover:text-pink-600 transition-colors">
                    {option.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700 transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">AI-Chat-Bot</h2>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600' 
                  : 'bg-gradient-to-r from-pink-500 to-rose-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Predefined Responses */}
        <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-200 flex-shrink-0">
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">Quick Responses</p>
            <div className="flex flex-wrap gap-2">
              {predefinedResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handlePredefinedResponse(response)}
                  className="px-3 py-1.5 text-xs bg-white hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-full transition-all duration-200 hover:shadow-sm"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
              />
              <button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;