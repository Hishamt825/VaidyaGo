import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  English: {
    dashboard: "Dashboard",
    welcome: "Welcome to VaidyaGo",
    language: "Language",
    search: "Search...",
    searchRecords: "Search records...",
    gettingStarted: "GETTING STARTED",
    startDigitalRecord: "Start Your Digital Record",
    uploadDescription: "Upload your first prescription or medical report. Our AI will automatically organize your health data into your timeline.",
    uploadPrescription: "Upload Prescription",
    medicationReminders: "Medication Reminders",
    neverMissDose: "Never miss a dose. Set up your schedule and get notified on time.",
    setFirstReminder: "Set your first reminder",
    appointments: "Appointments",
    keepVisitsOrganized: "Keep all your upcoming doctor visits in one organized view.",
    scheduleAppointment: "Schedule an appointment",
    yourVitals: "Your Vitals",
    noDataYet: "No data yet",
    vitalTrendsDescription: "Your vital trends will appear here once you start tracking metrics like BP, HR, or Weight.",
    logFirstMetric: "Log First Metric",
    recentJourney: "Recent Journey",
    accountCreated: "Account Created",
    welcomeFamily: "Welcome to the family! You've taken the first step towards better health management.",
    firstRecord: "First Record",
    pending: "Pending",
    waitingUpload: "Waiting for your first upload...",
    wealthHealth: "The greatest wealth is health. We're here to help you protect it.",
    symptomChecker: "Symptom Checker",
    medications: "Medications",
    messages: "Messages",
    reminder: "Reminder",
    myRecord: "My Record",
    exercise: "Exercise",
    newConsultation: "New Consultation",
    bodyAnalyzer: "Body Analyzer",
    askSpecialist: "Ask Specialist",
    carePlan: "Care Plan",
    stabilization: "Stabilization",
    progressReview: "Progress Review",
    phase2D: "Phase 2D",
    monthlyReview: "Monthly Review",
    phase3D: "Phase 3D",
    maintenanceLog: "Maintenance Log",
    recoveryJourney: "Recovery Journey",
    neckAlignment: "Neck Alignment",
    postureAnalysis: "Posture Analysis",
    analysisComplete: "Analysis Complete",
    postureAnalysis2: "Posture Analysis 2",
    viewRequest: "View Request",
    order: "Order",
    symptomOptions: "Symptom Options",
    medicationOptions: "Medication Options",
    needHelp: "Need help? Ask me!",
    askAnything: "Ask VaidyaGo anything...",
    thinking: "Thinking...",
    listening: "Listening...",
    tapToSpeak: "Tap to Speak!",
    backToChat: "Back to Chat",
    help: "Help",
    cancel: "Cancel",
    history: "History",
    playResponse: "Play Response",
    online: "Online",
    voiceMode: "Voice Mode",
    voiceSettings: "Voice Settings",
    hiPatient: "Hi Patient!",
    noSessions: "No sessions yet",
    previousConsultations: "Your previous health consultations",
    aiGreeting: "Hello! I am VaidyaGo AI, your health assistant. How can I assist you today?",
    doctorGreeting: "Hello Doctor! I am your clinical assistant. How can I help with your patients or schedule today?",
    adminGreeting: "Welcome back, Admin. Vado SuperAdmin systems are online. How can I assist with platform operations today?",
    voiceError: "Unfortunately, we couldn't start voice mode. Please check your internet connection.",
    micError: "Microphone access is blocked. Please enable it in your browser settings to use voice mode.",
    tapToRetry: "Tap to Retry!"
  },
  Hindi: {
    dashboard: "डैशबोर्ड",
    welcome: "वैद्यगो में आपका स्वागत है",
    language: "भाषा",
    search: "खोजें...",
    searchRecords: "रिकॉर्ड खोजें...",
    gettingStarted: "शुरुआत करें",
    startDigitalRecord: "अपना डिजिटल रिकॉर्ड शुरू करें",
    uploadDescription: "अपना पहला पर्चा या मेडिकल रिपोर्ट अपलोड करें। हमारा AI स्वचालित रूप से आपके स्वास्थ्य डेटा को व्यवस्थित करेगा।",
    uploadPrescription: "पर्चा अपलोड करें",
    medicationReminders: "दवा अनुस्मारक",
    neverMissDose: "कोई भी खुराक न चूकें। अपना शेड्यूल सेट करें और समय पर सूचना प्राप्त करें।",
    setFirstReminder: "अपना पहला अनुस्मारक सेट करें",
    appointments: "नियुक्तियाँ",
    keepVisitsOrganized: "अपनी आगामी सभी डॉक्टर मुलाकातों को एक व्यवस्थित दृश्य में रखें।",
    scheduleAppointment: "अपॉइंटमेंट शेड्यूल करें",
    yourVitals: "आपके वाइटल्स",
    noDataYet: "अभी तक कोई डेटा नहीं",
    vitalTrendsDescription: "एक बार जब आप बीपी, एचआर या वजन जैसे मेट्रिक्स ट्रैक करना शुरू करते हैं, तो आपके रुझान यहां दिखाई देंगे।",
    logFirstMetric: "पहला मेट्रिक लॉग करें",
    recentJourney: "हाल की यात्रा",
    accountCreated: "खाता बनाया गया",
    welcomeFamily: "परिवार में आपका स्वागत है! आपने बेहतर स्वास्थ्य प्रबंधन की ओर पहला कदम उठाया है।",
    firstRecord: "पहला रिकॉर्ड",
    pending: "लंबित",
    waitingUpload: "आपके पहले अपलोड की प्रतीक्षा है...",
    wealthHealth: "स्वास्थ्य ही सबसे बड़ा धन है। हम इसकी रक्षा करने में आपकी मदद करने के लिए यहां हैं।",
    symptomChecker: "लक्षण जांच",
    medications: "दवाएं",
    messages: "संदेश",
    reminder: "अनुस्मारक",
    myRecord: "मेरा रिकॉर्ड",
    exercise: "व्यायाम",
    newConsultation: "नई परामर्श",
    bodyAnalyzer: "शरीर विश्लेषक",
    askSpecialist: "विशेषज्ञ से पूछें",
    carePlan: "देखभाल योजना",
    stabilization: "स्थिरीकरण",
    progressReview: "प्रगति समीक्षा",
    phase2D: "चरण 2D",
    monthlyReview: "मासिक समीक्षा",
    phase3D: "चरण 3D",
    maintenanceLog: "रखरखाव लॉग",
    recoveryJourney: "रिकवरी यात्रा",
    neckAlignment: "गर्दन संरेखण",
    postureAnalysis: "मुद्रा विश्लेषण",
    analysisComplete: "विश्लेषण पूर्ण",
    postureAnalysis2: "मुद्रा विश्लेषण 2",
    viewRequest: "अनुरोध देखें",
    order: "ऑर्डर",
    symptomOptions: "लक्षण विकल्प",
    medicationOptions: "दवा विकल्प",
    needHelp: "क्या आपको मदद चाहिए? मुझसे पूछें!",
    askAnything: "वैद्यगो से कुछ भी पूछें...",
    thinking: "सोच रहा हूँ...",
    listening: "सुन रहा हूँ...",
    tapToSpeak: "बोलने के लिए टैप करें!",
    backToChat: "चैट पर वापस जाएं",
    help: "मदद",
    cancel: "रद्द करें",
    history: "इतिहास",
    playResponse: "जवाब चलाएं",
    online: "ऑनलाइन",
    voiceMode: "वॉयस मोड",
    voiceSettings: "वॉयस सेटिंग्स",
    hiPatient: "नमस्ते मरीज!",
    noSessions: "अभी तक कोई सत्र नहीं",
    previousConsultations: "आपके पिछले स्वास्थ्य परामर्श",
    aiGreeting: "नमस्ते! मैं वैद्यगो AI हूँ, आपका स्वास्थ्य सहायक। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    doctorGreeting: "नमस्ते डॉक्टर! मैं आपका नैदानिक सहायक हूँ। मैं आज आपके मरीजों या शेड्यूल में कैसे मदद कर सकता हूँ?",
    adminGreeting: "वापसी पर स्वागत है, एडमिन। वाडो सुपरएडमिन सिस्टम ऑनलाइन हैं। मैं आज प्लेटफॉर्म संचालन में कैसे सहायता कर सकता हूँ?",
    voiceError: "दुर्भाग्य से, हम वॉयस मोड शुरू नहीं कर सके। कृपया अपना इंटरनेट कनेक्शन जांचें।",
    micError: "माइक्रोफ़ोन एक्सेस ब्लॉक है। वॉयस मोड का उपयोग करने के लिए कृपया अपनी ब्राउज़र सेटिंग्स में इसे सक्षम करें।",
    tapToRetry: "पुन: प्रयास करने के लिए टैप करें!"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = "http://127.0.0.1:8000"; 

  useEffect(() => {
    fetchLanguage();
  }, []);

  const fetchLanguage = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`${BASE_URL}/accounts/switch-language/`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.language) {
        setLanguage(data.language);
      }
    } catch (error) {
      console.error("Error fetching language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${BASE_URL}/accounts/switch-language/`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.language) {
        setLanguage(data.language);
      }
    } catch (error) {
      console.error("Error toggling language:", error);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
