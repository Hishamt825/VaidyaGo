import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Phone, Calendar, Stethoscope, ChevronDown, CalendarClock, Menu, X, User } from 'lucide-react';
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";
import Request from "./Request";

const Makeapp = () => {
  const navigate = useNavigate();
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeCard, setActiveCard] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(doctors.length / itemsPerPage);
    const pages = [];
    const maxVisible = 9;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 6; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage > 4 && currentPage < totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 5; i <= totalPages; i++) pages.push(i);
      }
    }
    return pages;
  };

  const hospitals = [
    "VaidyaGo Cancer Institute, Defence Colony, New Delhi",
    "VaidyaGo CDOC, Chirag Enclave, New Delhi",
    "VaidyaGo Escorts Heart Institute, New Delhi",
    "VaidyaGo Escorts Hospital, Amritsar",
    "VaidyaGo Escorts Hospital, Faridabad",
    "VaidyaGo Escorts Hospital, Jaipur",
    "VaidyaGo Flt. Lt. Rajan Dhall Hospital, Vasant Kunj",
    "VaidyaGo Hospital - Greater Noida",
    "VaidyaGo Hospital & Kidney Institute, Gariahat, Kolkata",
    "VaidyaGo Hospital BG Road Bangalore",
    "VaidyaGo Hospital CG Road Bangalore",
    "VaidyaGo Hospital, Anandpur, Kolkata",
    "VaidyaGo Hospital, Kalyan, Mumbai",
    "VaidyaGo Hospital, Ludhiana",
    "VaidyaGo Hospital, Mohali",
    "VaidyaGo Hospital, Mulund, Mumbai",
    "VaidyaGo Hospital, Noida",
    "VaidyaGo Hospital, Rajajinagar, Bengaluru"
  ];

  const specialtiesList = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Oncology",
    "Gastroenterology",
    "Pediatrics",
    "Gynaecology",
    "Diabetology",
    "Dermatology",
    "Nephrology"
  ];

  const doctors = [
  {
    "id": 1,
    "name": "Dr. Balkar Singh",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 2,
    "name": "Dr. Gourdas Choudhuri",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 3,
    "name": "Dr. Gurinder Bedi",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 4,
    "name": "Dr. Vivek Kumar",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "19 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 5,
    "name": "Dr. Rashmi Taneja",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "20 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 6,
    "name": "Dr. Anoop Misra",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "21 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 7,
    "name": "Dr. Balkar Singh 7",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "22 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 8,
    "name": "Dr. Gourdas Choudhuri 8",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "23 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 9,
    "name": "Dr. Gurinder Bedi 9",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "24 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 10,
    "name": "Dr. Vivek Kumar 10",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "25 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 11,
    "name": "Dr. Rashmi Taneja 11",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "26 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 12,
    "name": "Dr. Anoop Misra 12",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "27 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 13,
    "name": "Dr. Balkar Singh 13",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "28 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 14,
    "name": "Dr. Gourdas Choudhuri 14",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "29 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 15,
    "name": "Dr. Gurinder Bedi 15",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "30 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 16,
    "name": "Dr. Vivek Kumar 16",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "31 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 17,
    "name": "Dr. Rashmi Taneja 17",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "32 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 18,
    "name": "Dr. Anoop Misra 18",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "33 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 19,
    "name": "Dr. Balkar Singh 19",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "34 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 20,
    "name": "Dr. Gourdas Choudhuri 20",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "35 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 21,
    "name": "Dr. Gurinder Bedi 21",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "36 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 22,
    "name": "Dr. Vivek Kumar 22",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "37 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 23,
    "name": "Dr. Rashmi Taneja 23",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "38 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 24,
    "name": "Dr. Anoop Misra 24",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "39 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 25,
    "name": "Dr. Balkar Singh 25",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "15 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 26,
    "name": "Dr. Gourdas Choudhuri 26",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 27,
    "name": "Dr. Gurinder Bedi 27",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 28,
    "name": "Dr. Vivek Kumar 28",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 29,
    "name": "Dr. Rashmi Taneja 29",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "19 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 30,
    "name": "Dr. Anoop Misra 30",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "20 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 31,
    "name": "Dr. Balkar Singh 31",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "21 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 32,
    "name": "Dr. Gourdas Choudhuri 32",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "22 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 33,
    "name": "Dr. Gurinder Bedi 33",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "23 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 34,
    "name": "Dr. Vivek Kumar 34",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "24 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 35,
    "name": "Dr. Rashmi Taneja 35",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "25 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 36,
    "name": "Dr. Anoop Misra 36",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "26 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 37,
    "name": "Dr. Balkar Singh 37",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "27 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 38,
    "name": "Dr. Gourdas Choudhuri 38",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "28 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 39,
    "name": "Dr. Gurinder Bedi 39",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "29 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 40,
    "name": "Dr. Vivek Kumar 40",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "30 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 41,
    "name": "Dr. Rashmi Taneja 41",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "31 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 42,
    "name": "Dr. Anoop Misra 42",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "32 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 43,
    "name": "Dr. Balkar Singh 43",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "33 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 44,
    "name": "Dr. Gourdas Choudhuri 44",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "34 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 45,
    "name": "Dr. Gurinder Bedi 45",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "35 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 46,
    "name": "Dr. Vivek Kumar 46",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "36 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 47,
    "name": "Dr. Rashmi Taneja 47",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "37 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 48,
    "name": "Dr. Anoop Misra 48",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "38 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 49,
    "name": "Dr. Balkar Singh 49",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "39 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 50,
    "name": "Dr. Gourdas Choudhuri 50",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "15 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 51,
    "name": "Dr. Gurinder Bedi 51",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 52,
    "name": "Dr. Vivek Kumar 52",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 53,
    "name": "Dr. Rashmi Taneja 53",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 54,
    "name": "Dr. Anoop Misra 54",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "19 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 55,
    "name": "Dr. Balkar Singh 55",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "20 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 56,
    "name": "Dr. Gourdas Choudhuri 56",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "21 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 57,
    "name": "Dr. Gurinder Bedi 57",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "22 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 58,
    "name": "Dr. Vivek Kumar 58",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "23 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 59,
    "name": "Dr. Rashmi Taneja 59",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "24 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 60,
    "name": "Dr. Anoop Misra 60",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "25 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 61,
    "name": "Dr. Balkar Singh 61",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "26 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 62,
    "name": "Dr. Gourdas Choudhuri 62",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "27 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 63,
    "name": "Dr. Gurinder Bedi 63",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "28 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 64,
    "name": "Dr. Vivek Kumar 64",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "29 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 65,
    "name": "Dr. Rashmi Taneja 65",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "30 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 66,
    "name": "Dr. Anoop Misra 66",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "31 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 67,
    "name": "Dr. Balkar Singh 67",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "32 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 68,
    "name": "Dr. Gourdas Choudhuri 68",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "33 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 69,
    "name": "Dr. Gurinder Bedi 69",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "34 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 70,
    "name": "Dr. Vivek Kumar 70",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "35 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 71,
    "name": "Dr. Rashmi Taneja 71",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "36 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 72,
    "name": "Dr. Anoop Misra 72",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "37 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 73,
    "name": "Dr. Balkar Singh 73",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "38 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 74,
    "name": "Dr. Gourdas Choudhuri 74",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "39 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 75,
    "name": "Dr. Gurinder Bedi 75",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "15 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 76,
    "name": "Dr. Vivek Kumar 76",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 77,
    "name": "Dr. Rashmi Taneja 77",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 78,
    "name": "Dr. Anoop Misra 78",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 79,
    "name": "Dr. Balkar Singh 79",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "19 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 80,
    "name": "Dr. Gourdas Choudhuri 80",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "20 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 81,
    "name": "Dr. Gurinder Bedi 81",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "21 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 82,
    "name": "Dr. Vivek Kumar 82",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "22 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 83,
    "name": "Dr. Rashmi Taneja 83",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "23 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 84,
    "name": "Dr. Anoop Misra 84",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "24 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 85,
    "name": "Dr. Balkar Singh 85",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "25 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 86,
    "name": "Dr. Gourdas Choudhuri 86",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "26 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 87,
    "name": "Dr. Gurinder Bedi 87",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "27 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 88,
    "name": "Dr. Vivek Kumar 88",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "28 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 89,
    "name": "Dr. Rashmi Taneja 89",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "29 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 90,
    "name": "Dr. Anoop Misra 90",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "30 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 91,
    "name": "Dr. Balkar Singh 91",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "31 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 92,
    "name": "Dr. Gourdas Choudhuri 92",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "32 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 93,
    "name": "Dr. Gurinder Bedi 93",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "33 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 94,
    "name": "Dr. Vivek Kumar 94",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "34 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 95,
    "name": "Dr. Rashmi Taneja 95",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "35 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 96,
    "name": "Dr. Anoop Misra 96",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "36 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 97,
    "name": "Dr. Balkar Singh 97",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "37 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 98,
    "name": "Dr. Gourdas Choudhuri 98",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "38 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 99,
    "name": "Dr. Gurinder Bedi 99",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "39 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 100,
    "name": "Dr. Vivek Kumar 100",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "15 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 101,
    "name": "Dr. Rashmi Taneja 101",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 102,
    "name": "Dr. Anoop Misra 102",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 103,
    "name": "Dr. Balkar Singh 103",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 104,
    "name": "Dr. Gourdas Choudhuri 104",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "19 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 105,
    "name": "Dr. Gurinder Bedi 105",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "20 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 106,
    "name": "Dr. Vivek Kumar 106",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "21 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 107,
    "name": "Dr. Rashmi Taneja 107",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "22 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 108,
    "name": "Dr. Anoop Misra 108",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "23 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 109,
    "name": "Dr. Balkar Singh 109",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "24 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 110,
    "name": "Dr. Gourdas Choudhuri 110",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "25 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 111,
    "name": "Dr. Gurinder Bedi 111",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "26 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 112,
    "name": "Dr. Vivek Kumar 112",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "27 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 113,
    "name": "Dr. Rashmi Taneja 113",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "28 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 114,
    "name": "Dr. Anoop Misra 114",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "29 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 115,
    "name": "Dr. Balkar Singh 115",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "30 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 116,
    "name": "Dr. Gourdas Choudhuri 116",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "31 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 117,
    "name": "Dr. Gurinder Bedi 117",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "32 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 118,
    "name": "Dr. Vivek Kumar 118",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "33 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 119,
    "name": "Dr. Rashmi Taneja 119",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "34 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 120,
    "name": "Dr. Anoop Misra 120",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "35 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 121,
    "name": "Dr. Balkar Singh 121",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "36 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 122,
    "name": "Dr. Gourdas Choudhuri 122",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "37 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 123,
    "name": "Dr. Gurinder Bedi 123",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "38 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 124,
    "name": "Dr. Vivek Kumar 124",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "39 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 125,
    "name": "Dr. Rashmi Taneja 125",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "15 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 126,
    "name": "Dr. Anoop Misra 126",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 127,
    "name": "Dr. Balkar Singh 127",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 128,
    "name": "Dr. Gourdas Choudhuri 128",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 129,
    "name": "Dr. Gurinder Bedi 129",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "19 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 130,
    "name": "Dr. Vivek Kumar 130",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "20 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 131,
    "name": "Dr. Rashmi Taneja 131",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "21 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 132,
    "name": "Dr. Anoop Misra 132",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "22 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 133,
    "name": "Dr. Balkar Singh 133",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "23 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 134,
    "name": "Dr. Gourdas Choudhuri 134",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "24 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 135,
    "name": "Dr. Gurinder Bedi 135",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "25 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 136,
    "name": "Dr. Vivek Kumar 136",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "26 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 137,
    "name": "Dr. Rashmi Taneja 137",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "27 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 138,
    "name": "Dr. Anoop Misra 138",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "28 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 139,
    "name": "Dr. Balkar Singh 139",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "29 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 140,
    "name": "Dr. Gourdas Choudhuri 140",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "30 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 141,
    "name": "Dr. Gurinder Bedi 141",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "31 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 142,
    "name": "Dr. Vivek Kumar 142",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "32 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 143,
    "name": "Dr. Rashmi Taneja 143",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "33 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 144,
    "name": "Dr. Anoop Misra 144",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "34 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 145,
    "name": "Dr. Balkar Singh 145",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "35 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 146,
    "name": "Dr. Gourdas Choudhuri 146",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "36 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 147,
    "name": "Dr. Gurinder Bedi 147",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "37 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 148,
    "name": "Dr. Vivek Kumar 148",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "38 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 149,
    "name": "Dr. Rashmi Taneja 149",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "39 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 150,
    "name": "Dr. Anoop Misra 150",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "15 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 151,
    "name": "Dr. Balkar Singh 151",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 152,
    "name": "Dr. Gourdas Choudhuri 152",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 153,
    "name": "Dr. Gurinder Bedi 153",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 154,
    "name": "Dr. Vivek Kumar 154",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "19 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 155,
    "name": "Dr. Rashmi Taneja 155",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "20 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 156,
    "name": "Dr. Anoop Misra 156",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "21 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 157,
    "name": "Dr. Balkar Singh 157",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "22 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 158,
    "name": "Dr. Gourdas Choudhuri 158",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "23 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 159,
    "name": "Dr. Gurinder Bedi 159",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "24 Years",
    "fees": "2900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 160,
    "name": "Dr. Vivek Kumar 160",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "25 Years",
    "fees": "1000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 161,
    "name": "Dr. Rashmi Taneja 161",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "26 Years",
    "fees": "1100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 162,
    "name": "Dr. Anoop Misra 162",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "27 Years",
    "fees": "1200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 163,
    "name": "Dr. Balkar Singh 163",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "28 Years",
    "fees": "1300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 164,
    "name": "Dr. Gourdas Choudhuri 164",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "29 Years",
    "fees": "1400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 165,
    "name": "Dr. Gurinder Bedi 165",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "30 Years",
    "fees": "1500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 166,
    "name": "Dr. Vivek Kumar 166",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "31 Years",
    "fees": "1600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 167,
    "name": "Dr. Rashmi Taneja 167",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "32 Years",
    "fees": "1700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 168,
    "name": "Dr. Anoop Misra 168",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "33 Years",
    "fees": "1800",
    "image": "/assets/makeman.png"
  },
  {
    "id": 169,
    "name": "Dr. Balkar Singh 169",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "34 Years",
    "fees": "1900",
    "image": "/assets/makeman.png"
  },
  {
    "id": 170,
    "name": "Dr. Gourdas Choudhuri 170",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "35 Years",
    "fees": "2000",
    "image": "/assets/makeman.png"
  },
  {
    "id": 171,
    "name": "Dr. Gurinder Bedi 171",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "36 Years",
    "fees": "2100",
    "image": "/assets/makeman.png"
  },
  {
    "id": 172,
    "name": "Dr. Vivek Kumar 172",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "37 Years",
    "fees": "2200",
    "image": "/assets/makeman.png"
  },
  {
    "id": 173,
    "name": "Dr. Rashmi Taneja 173",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "38 Years",
    "fees": "2300",
    "image": "/assets/makeman.png"
  },
  {
    "id": 174,
    "name": "Dr. Anoop Misra 174",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "39 Years",
    "fees": "2400",
    "image": "/assets/makeman.png"
  },
  {
    "id": 175,
    "name": "Dr. Balkar Singh 175",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "15 Years",
    "fees": "2500",
    "image": "/assets/makeman.png"
  },
  {
    "id": 176,
    "name": "Dr. Gourdas Choudhuri 176",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "16 Years",
    "fees": "2600",
    "image": "/assets/makeman.png"
  },
  {
    "id": 177,
    "name": "Dr. Gurinder Bedi 177",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "17 Years",
    "fees": "2700",
    "image": "/assets/makeman.png"
  },
  {
    "id": 178,
    "name": "Dr. Vivek Kumar 178",
    "title": "EXECUTIVE CHAIRMAN VaidyaGo C DOC |",
    "department": "VaidyaGo C-Doc",
    "specialties": [
      "Diabetology/Endocrinology |",
      "Diabetology/Endocrinology | Endocrinology"
    ],
    "experience": "18 Years",
    "fees": "2800",
    "image": "/assets/makeman.png"
  }
];

  return (
    <div className="min-h-screen bg-[#FDFEFE] font-sans text-gray-800 pb-12">

      {/* 1. TOP NAVBAR (Solid Teal) */}
      <section className="relative overflow-hidden ">
        {/* Background Image */}


        {/* Navbar */}
        <header className="relative flex items-center justify-between px-8 py-2.5 bg-[#19718A] border-b border-white/30">

          {/* Empty Left Space (Balance Maintain Karne Ke Liye) */}
          <div className="w-[280px]"></div>

          {/* CENTER NAVIGATION */}
          <nav className="absolute left-[420px] xl:left-[460px] text-[18px] -translate-x-1/2 hidden lg:flex items-center gap-10 xl:gap-[60px]">
            {["Home", "About", "Our Service", "Doctor", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Home") navigate("/MainPage");
                  else if (item === "Our Service") navigate("/Service");
                  else navigate(`/${item.replace(/\s+/g, "")}`);
                }}
                className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${item === "Doctor" ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* RIGHT SECTION (Icons + Contact) */}
          <div className="flex items-center justify-end w-full lg:w-auto lg:mr-8 xl:mr-16">

            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/assets/search.svg" alt="Search" className="w-5 h-5 invert" />
              </button>

              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/assets/Bell.png" alt="Bell" className="w-5 h-5 invert" />
              </button>

              <button
                onClick={() => navigate("/ContactUs")}
                className="border-[1.2px] border-white text-white px-5 py-1.5 rounded-full font-bold text-sm transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Contact Us
              </button>

              {/* Authentication Buttons */}
              <div className="flex items-center text-white/90 text-[14px] font-medium ml-6 xl:ml-10 bg-[#0C6173]/60 px-5 py-1.5 rounded-full border border-white/20 shadow-inner">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Log in
                </button>
                <div className="w-[1.5px] h-3.5 bg-white/40 mx-4"></div>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Sign up
                </button>
              </div>
            </div>

            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 ml-1 text-white hover:bg-white/10 rounded-md border border-white/30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>

        </header>

        {/* MOBILE MENU SIDEBAR (OVERLAP) */}
        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-[#19718A] z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col py-6 px-6 shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Close Button Inside Drawer */}
          <div className="flex justify-end mb-8 pb-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-white hover:bg-white/10 rounded-md transition-colors border border-white/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-6 flex-1">
            <button onClick={() => { navigate("/MainPage"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Home</button>
            <button onClick={() => { navigate("/About"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">About</button>
            <button onClick={() => { navigate("/Service"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Our Service</button>
            <button onClick={() => { setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Doctor</button>
            <button onClick={() => { setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">FAQ</button>
          </div>

          <div className="flex gap-6 mt-auto pt-6 border-t border-white/20 justify-center">
            <button className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300">
              <img src="/assets/search.svg" alt="Search" className="w-5 h-5 invert" />
            </button>
            <button className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300">
              <img src="/assets/Bell.png" alt="Bell" className="w-5 h-5 invert" />
            </button>
          </div>

          <button
            onClick={() => { navigate("/ContactUs"); setIsMobileMenuOpen(false); }}
            className="border-[1.2px] border-white text-white px-8 py-3 rounded-full font-bold transform transition-all duration-300 hover:scale-105 mt-6 text-[16px] w-full"
          >
            Contact Us
          </button>
        </div>
      </section>

      <div className="border-b border-gray-200 bg-[#F6F9FA] py-3 shadow-sm">
        <div className="max-w-[1280px] w-[90%] md:w-[85%] mx-auto flex justify-center items-center gap-4 text-[14px]">
          <button 
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 border border-[#8DC3CD] bg-white text-[#19718A] rounded-full px-5 py-2 font-semibold hover:bg-[#E8F3F4] transition-colors shadow-sm text-[14px]"
          >
            <Phone size={16} className="text-[#64A3E3]" strokeWidth={2.5} />
            <span className="text-[#5190a0]">Request Callback</span>
          </button>
          <button className="flex items-center gap-2 border border-[#19718A] bg-[#19718A] text-white rounded-full px-5 py-2 font-semibold transition-colors shadow-md text-[14px]">
            <Calendar size={16} className="text-white" strokeWidth={2.5} />
            <span className="text-white">Make Appointment</span>
          </button>
          <button className="flex items-center gap-2 border border-[#8DC3CD] bg-white text-[#19718A] rounded-full px-5 py-2 font-semibold hover:bg-[#E8F3F4] transition-colors shadow-sm text-[14px]">
            <Stethoscope size={16} className="text-[#19718A]" strokeWidth={2.5} />
            <span className="text-[#5190a0]">Get Health Checkup</span>
          </button>
        </div>
      </div>

      {/* 3. SEARCH & FILTERS BAR */}
      <div className="max-w-[1280px] w-[90%] md:w-[85%] mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Search Input */}
        <div className="relative w-full md:w-[320px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 text-[16px] text-gray-700 focus:outline-none focus:border-[#19718A] shadow-sm font-medium"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#19718A]" strokeWidth={2.5} />
        </div>

        {/* Dropdown Filters */}
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[220px]">
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-4 pr-8 text-[16px] text-gray-700 bg-white shadow-sm focus:outline-none focus:border-[#19718A] font-medium cursor-pointer"
            >
              <option value="">Filter by Hospital</option>
              {hospitals.map((h, i) => (
                <option key={i} value={h}>{h}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-[180px]">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-4 pr-8 text-[16px] text-gray-700 bg-white shadow-sm focus:outline-none focus:border-[#19718A] font-medium cursor-pointer"
            >
              <option value="">Speciality</option>
              {specialtiesList.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. DOCTOR CARDS GRID */}
      <div className="max-w-[1280px] w-[90%] md:w-[85%] mx-auto px-4 md:px-6 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {doctors
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((doctor, index) => (
            <div
              key={index}
              className={`flex flex-col bg-white transition-all duration-500 ease-out cursor-pointer w-full relative font-['Montserrat',sans-serif] 
                rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden
                ${activeCard === index ? 'ring-2 ring-[#19718A]/30 scale-[1.01]' : 'hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]'}
              `}
              onClick={() => setActiveCard(index)}
            >
              {/* Card Body: Profile Info */}
              <div className="p-4 flex-grow flex flex-col">
                {/* Top Row: Photo & Titles */}
                <div className="flex gap-4 mb-3">
                  <div className="w-[75px] h-[75px] rounded-full overflow-hidden shrink-0 border-2 border-gray-50 flex items-center justify-center bg-gray-50">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-[18px] font-bold text-[#1a1a1a] leading-tight mb-0.5">{doctor.name}</h3>
                    <p className="text-[14px] font-bold text-gray-500 uppercase tracking-tight leading-3">
                      {doctor.title}
                    </p>
                    <p className="text-[14px] font-medium text-gray-600 mt-0.5">{doctor.department}</p>
                  </div>
                </div>

                {/* Specialty Pills */}
                <div className="space-y-1.5 mb-4">
                  {doctor.specialties?.map((spec, i) => (
                    <div key={i} className="bg-[#F3F4FF] rounded-md px-2.5 py-1 text-[14px] text-gray-600 font-medium leading-normal">
                      {spec}
                    </div>
                  ))}
                </div>

                {/* Stats Row: Experience & Fees */}
                <div className="flex items-center gap-10 mb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <CalendarClock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[16px] font-bold text-black">{doctor.experience}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-0.5">Experience</span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[18px] font-bold text-black">₹ {doctor.fees}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-0.5 ml-0.5">Fees</span>
                  </div>
                </div>

                {/* Extra Information */}
                {doctor.extraInfo && (
                  <div className="mb-4">
                    <div className="flex items-start gap-1.5 text-[13px] text-gray-600">
                      <div className="mt-0.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div className="whitespace-pre-line leading-snug">
                        {doctor.extraInfo}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom: Action Buttons */}
              <div className="flex border-t border-gray-100 h-[46px]">
                <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 text-[14px] font-bold tracking-tight border-r border-gray-100 transition-colors uppercase">
                  View Full Profile
                </button>
                <button className="flex-1 bg-[#19718A] hover:bg-[#156176] text-white text-[14px] font-bold tracking-tight transition-colors uppercase">
                  Book An Appointment
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* 5. PAGINATION SECTION */}
        <div className="mt-12 flex flex-col items-end gap-2 pr-4 font-sans">
          <div className="flex items-center gap-2 md:gap-4 text-[14px]">
            <button 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 hover:text-[#19718A] transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              First
            </button>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-[19px] py-[7px] border border-[#F4D7D0] rounded-md text-[12px] font-medium hover:bg-[#FDF4F2] transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Newer
            </button>

            {renderPageNumbers().map((page, i) => (
              <button
                key={i}
                disabled={page === '...'}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] transition-all font-medium
                  ${currentPage === page 
                    ? 'bg-[#313131] text-white shadow-md' 
                    : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-[#313131] hover:bg-gray-100'
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(doctors.length / itemsPerPage)))}
              disabled={currentPage === Math.ceil(doctors.length / itemsPerPage)}
              className={`px-[19px] py-[7px] border border-[#F4D7D0] rounded-md text-[12px] font-medium hover:bg-[#FDF4F2] transition-colors ${currentPage === Math.ceil(doctors.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Older
            </button>

            <button 
              onClick={() => setCurrentPage(Math.ceil(doctors.length / itemsPerPage))}
              disabled={currentPage === Math.ceil(doctors.length / itemsPerPage)}
              className={`px-3 py-1 hover:text-[#19718A] transition-colors ${currentPage === Math.ceil(doctors.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Last
            </button>
          </div>

          <div className="text-[12px] text-black font-normal mr-1">
            Showing results {Math.min((currentPage - 1) * itemsPerPage + 1, doctors.length)} - {Math.min(currentPage * itemsPerPage, doctors.length)} of {doctors.length}
          </div>
        </div>

      </div>



      {/* ===== Footer Section ===== */}
      <footer className="bg-[#19718A] text-white py-16 -mb-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* === Logo + Description === */}
          <div className="flex flex-col items-start -mt-6">
            <img
              src="/assets/logo.png"
              alt="VaidyaGo Logo"
              className="w-56 mb-4 -ml-5"
            />

            <p className="text-[14px] leading-relaxed max-w-xs font-serif">
              Committed to compassionate care, advanced
              technology, and healthier lives serving
              Eastern U.P. with trust, excellence,
              and integrity since 1989.
            </p>
          </div>

          {/* === Quick Links === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif">
              <li className="flex items-center gap-2 mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/MainPage"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors text-left"
                >
                  Home
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/About"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors text-left"
                >
                  About Us
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/Service"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/FAQ"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  FAQ
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/ContactUs"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Contact Us
                </button>
              </li>

            </ul>
          </div>

          {/* === Our Services === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Our Services</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif mb-4">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>

          {/* === Contact Us === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[16px] font-[400]">

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/cl.png" alt="icon" className="w-4 h-4"></img>
                <span>+91 9879877801</span>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo24@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo247@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <i className="fa fa-map-marker text-sm"></i>
                <img src="/assets/map.png" alt="icon" className="w-4 h-4"></img>
                <span>
                  xyz, xyz, Gorakhpur,<br />
                  Uttar Pradesh, 273015
                </span>
              </li>

              {/* ==== Social Icons ===== */}
              <li className="flex items-center gap-3 pt-2">
                <img src="/assets/you.png" className="w-5 cursor-pointer" />
                <img src="/assets/insta.png" className="w-5 cursor-pointer" />
                <img src="/assets/map1.png" className="w-5 cursor-pointer" />
                <img src="/assets/what.png" className="w-5 cursor-pointer" />
              </li>

            </ul>
          </div>
        </div>

        {/* === Bottom Line === */}

      </footer>
      {/* Render Modals */}
      {showLoginModal && (
        <Finallogin
          isModal={true}
          onClose={() => setShowLoginModal(false)}
          onSwitchToForget={() => {
            setShowLoginModal(false);
            setShowForgetModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <Signup1
          isModal={true}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showForgetModal && (
        <Forget
          isModal={true}
          onClose={() => setShowForgetModal(false)}
          onSwitchToLogin={() => {
            setShowForgetModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      <Request 
        isOpen={showRequestModal} 
        onClose={() => setShowRequestModal(false)} 
      />
    </div>

  );
};

export default Makeapp;
