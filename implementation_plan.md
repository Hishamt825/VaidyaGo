# Implementation Plan - Bilingual Language Switcher Integration for Consultation Modules

Integrate the `useLanguage` hook and the standard glassmorphism-styled "EN/HI" language toggle into all identified Consultation modules to ensure a unified bilingual user experience across the patient-facing side of the application.

## Proposed Changes

### [Consultation Component]
#### [MODIFY] [Consultation1.jsx](file:///D:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/component/Day1/Consultation/Consultation1.jsx)
- Import `useLanguage` from `../../../context/LanguageContext`.
- Initialize `language` and `toggleLanguage` from the hook.
- Replace the static "Language" text in the header with the interactive "EN/HI" toggle div.
- Ensure the toggle follows the glassmorphism design (`bg-white/10`, `border-white/10`, `rounded-full`).

#### [MODIFY] [Consultation_info.jsx](file:///D:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/component/Day1/Consultation/Consultation_info.jsx)
- Import `useLanguage` from `../../../context/LanguageContext`.
- Initialize `language` and `toggleLanguage` from the hook.
- Replace the static "Language" text in the header with the interactive "EN/HI" toggle div.
- Ensure the toggle follows the glassmorphism design.

#### [MODIFY] [view_profile.jsx](file:///D:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/component/Day1/Consultation/view_profile.jsx)
- Import `useLanguage` from `../../../context/LanguageContext`.
- Initialize `language` and `toggleLanguage` from the hook.
- Replace the static "Language" text in the header with the interactive "EN/HI" toggle div.
- Ensure the toggle follows the glassmorphism design.

## Verification Plan

### Manual Verification
- Navigate through all updated Consultation pages.
- Verify that the language toggle appears in the header with the "EN/HI" label.
- Click the toggle and ensure it changes the language state globally (persisting across pages).
- Verify that the glassmorphism styling is consistent with other patient-facing modules.
