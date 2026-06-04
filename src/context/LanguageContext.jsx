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
    tapToRetry: "Tap to Retry!",
    healthDashboard: "Health Dashboard",
    welcomeBack: "Welcome back",
    backToDashboard: "Back to Dashboard",
    aiSymptomChecker: "AI Symptom Checker",
    aiActive: "AI Active",
    describeFeeling: "Describe how you're feeling today...",
    specialistsForYou: "Specialists for You",
    seeAll: "See All",
    bookNow: "Book Now",
    symptomLine1: "Symptom",
    symptomLine2: "Check",
    bookLine1: "Book",
    bookLine2: "Doctor",
    uploadLine1: "Upload",
    uploadLine2: "RX",
    recordsLine: "Records",
    reminders: "Reminders",
    hydrationGoal: "Hydration Goal",
    prescriptionVault: "Prescription Vault",
    uploadNewPrescription: "Upload New Prescription",
    pdfJpgPng: "PDF, JPG or PNG up to 10MB",
    loadingVault: "Loading vault...",
    vaultEmpty: "Your vault is empty.",
    heartRate: "Heart Rate",
    bloodPressure: "Blood Pressure",
    aiAnalysisText1: "Based on your recent report from ",
    aiAnalysisText2: ", I've analyzed your ",
    aiAnalysisText3: " prescribed medications. Don't forget to take your ",
    aiAnalysisText4: " today.",
    aiReadyText: "I'm ready to analyze your medical records. Upload a prescription to get personalized health insights.",
    userChatSample: "A bit of fatigue in the afternoons, yes. No extra thirst though.",
    cardiologistExp: "Cardiologist • 12 years exp.",
    gpExp: "General Practitioner • 8 years exp.",
    chatConsultation: "Chat Consultation with AI Assistant",
    symptomAnalysisGenerated: "Symptom analysis and health summary generated.",
    labResultsUploaded: "Lab Results Uploaded",
    actionRequired: "Action Required",
    loadingReminders: "Loading reminders...",
    noMedsToday: "No medications scheduled for today.",
    bodyBannerText: "Welcome back, Dr. Thorne. Please select the anatomical region where the patient reports discomfort to begin the diagnostic mapping.",
    diagnosticsHeader: "Diagnostics",
    selectedAreas: "Selected Areas",
    noRegionSelected: "No Region Selected",
    relatedDiseases: "Related Diseases",
    selectRegionDiseases: "Select a body region to view related diseases",
    reportedSymptomsBody: "Reported Symptoms",
    selectRegionSymptoms: "Select a body region to view symptoms",
    startDiagnostic: "START DIAGNOSTIC",
    diagnosticsResults: "Diagnostics Results",
    phaseComplete: "Phase : Complete",
    analysisReference: "Analysis Reference",
    inputSummary: "Input Summary",
    primaryComplaints: "PRIMARY COMPLAINTS",
    vitalsReported: "VITALS (REPORTED)",
    tempLabel: "Temp",
    bpmLabel: "BPM",
    editDetails: "Edit details ✎",
    patientSummary: "PATIENT SUMMARY",
    temperatureLabel: "Temperature",
    heartRateLabel: "Heart Rate",
    primarySymptomsLabel: "PRIMARY SYMPTOMS",
    analysisHistory: "Analysis History",
    compareResultsText: "Compare current results with previous 6 months of diagnostic data.",
    viewTrends: "View Trends",
    potentialConditions: "POTENTIAL CONDITIONS",
    sortByConfidence: "Sort by Confidence ▾",
    matchLabel: "MATCH",
    clinicalData: "Clinical Data",
    aiPrecautionsAdvice: "AI PRECAUTIONS & ADVICE",
    precautionsLabel: "Precautions",
    recommendationsLabel: "Recommendations",
    actionableNextSteps: "ACTIONABLE NEXT STEPS",
    bookConsultation: "Book a Consultation",
    telehealthDesc: "Speak with a General Practitioner via telehealth in < 15 mins.",
    connectNow: "Connect Now →",
    findPharmacy: "Find a Pharmacy",
    locatePharmacies: "Locate pharmacies nearby for immediate relief medications.",
    openMap: "Open Map →",
    healthGuide: "Health Guide",
    deepDive: "Deep dive into managed care strategies for these conditions.",
    readMore: "Read More →",
    clinicsNearby: "2 Clinics Nearby"
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
    tapToRetry: "पुन: प्रयास करने के लिए टैप करें!",
    healthDashboard: "स्वास्थ्य डैशबोर्ड",
    welcomeBack: "वापसी पर स्वागत है",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    aiSymptomChecker: "एआई लक्षण जांचकर्ता",
    aiActive: "एआई सक्रिय",
    describeFeeling: "बताएं कि आज आप कैसा महसूस कर रहे हैं...",
    specialistsForYou: "आपके लिए विशेषज्ञ",
    seeAll: "सभी देखें",
    bookNow: "अभी बुक करें",
    symptomLine1: "लक्षण",
    symptomLine2: "जांच",
    bookLine1: "डॉक्टर",
    bookLine2: "बुक करें",
    uploadLine1: "नुस्खा",
    uploadLine2: "अपलोड करें",
    recordsLine: "रिकॉर्ड्स",
    reminders: "अनुस्मारक",
    hydrationGoal: "जलयोजन लक्ष्य",
    prescriptionVault: "प्रिस्क्रिप्शन वॉल्ट",
    uploadNewPrescription: "नया प्रिस्क्रिप्शन अपलोड करें",
    pdfJpgPng: "पीडीएफ, जेपीजी या पीएनजी 10MB तक",
    loadingVault: "वॉल्ट लोड हो रहा है...",
    vaultEmpty: "आपका वॉल्ट खाली है।",
    heartRate: "हृदय गति",
    bloodPressure: "रक्तचाप",
    aiAnalysisText1: "आपके हालिया रिपोर्ट के आधार पर ",
    aiAnalysisText2: " से, मैंने आपके ",
    aiAnalysisText3: " निर्धारित दवाओं का विश्लेषण किया है। आज अपनी ",
    aiAnalysisText4: " लेना न भूलें।",
    aiReadyText: "मैं आपके मेडिकल रिकॉर्ड का विश्लेषण करने के लिए तैयार हूँ। व्यक्तिगत स्वास्थ्य जानकारी प्राप्त करने के लिए एक प्रिस्क्रिप्शन अपलोड करें।",
    userChatSample: "दोपहर में थोड़ी थकान होती है, हाँ। हालांकि अतिरिक्त प्यास नहीं।",
    cardiologistExp: "हृदय रोग विशेषज्ञ • 12 वर्ष का अनुभव",
    gpExp: "सामान्य चिकित्सक • 8 वर्ष का अनुभव",
    chatConsultation: "एआई सहायक के साथ चैट परामर्श",
    symptomAnalysisGenerated: "लक्षण विश्लेषण और स्वास्थ्य सारांश उत्पन्न किया गया।",
    labResultsUploaded: "लैब परिणाम अपलोड किए गए",
    actionRequired: "कार्रवाई की आवश्यकता",
    loadingReminders: "अनुस्मारक लोड हो रहे हैं...",
    noMedsToday: "आज के लिए कोई दवा निर्धारित नहीं है।",
    bodyBannerText: "वापसी पर स्वागत है, डॉ. थॉर्न। डायग्नोस्टिक मैपिंग शुरू करने के लिए कृपया उस शारीरिक क्षेत्र का चयन करें जहां मरीज को असुविधा की शिकायत है।",
    diagnosticsHeader: "निदान",
    selectedAreas: "चयनित क्षेत्र",
    noRegionSelected: "कोई क्षेत्र चयनित नहीं",
    relatedDiseases: "संबंधित रोग",
    selectRegionDiseases: "संबंधित रोग देखने के लिए शरीर के किसी क्षेत्र का चयन करें",
    reportedSymptomsBody: "दर्ज किए गए लक्षण",
    selectRegionSymptoms: "लक्षण देखने के लिए शरीर के किसी क्षेत्र का चयन करें",
    startDiagnostic: "निदान शुरू करें",
    diagnosticsResults: "निदान परिणाम",
    phaseComplete: "चरण : पूर्ण",
    analysisReference: "विश्लेषण संदर्भ",
    inputSummary: "इनपुट सारांश",
    primaryComplaints: "प्राथमिक शिकायतें",
    vitalsReported: "वाइटल्स (रिपोर्ट किए गए)",
    tempLabel: "तापमान",
    bpmLabel: "बीपीएम",
    editDetails: "विवरण संपादित करें ✎",
    patientSummary: "मरीज का सारांश",
    temperatureLabel: "तापमान",
    heartRateLabel: "हृदय गति",
    primarySymptomsLabel: "प्राथमिक लक्षण",
    analysisHistory: "विश्लेषण इतिहास",
    compareResultsText: "पिछले 6 महीनों के डायग्नोस्टिक डेटा के साथ वर्तमान परिणामों की तुलना करें।",
    viewTrends: "रुझान देखें",
    potentialConditions: "संभावित स्थितियाँ",
    sortByConfidence: "विश्वास के आधार पर क्रमबद्ध करें ▾",
    matchLabel: "मिलान",
    clinicalData: "नैदानिक डेटा",
    aiPrecautionsAdvice: "एआई सावधानियां और सलाह",
    precautionsLabel: "सावधानियां",
    recommendationsLabel: "सिफारिशें",
    actionableNextSteps: "कार्रवाई योग्य अगले कदम",
    bookConsultation: "परामर्श बुक करें",
    telehealthDesc: "< 15 मिनट में टेलीहेल्थ के माध्यम से जनरल प्रैक्टिशनर से बात करें।",
    connectNow: "अभी जुड़ें →",
    findPharmacy: "फार्मेसी खोजें",
    locatePharmacies: "तत्काल राहत दवाओं के लिए आस-पास फार्मेसियों का पता लगाएं।",
    openMap: "मानचित्र खोलें →",
    healthGuide: "स्वास्थ्य गाइड",
    deepDive: "इन स्थितियों के लिए प्रबंधित देखभाल रणनीतियों में गहराई से जाएं।",
    readMore: "अधिक पढ़ें →",
    clinicsNearby: "आस-पास 2 क्लीनिक"
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
    const langData = translations[language] || translations['English'] || {};
    return langData[key] || translations['English'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'English',
      toggleLanguage: () => {},
      t: (key) => translations['English'][key] || key,
      isLoading: false,
    };
  }
  return context;
};
