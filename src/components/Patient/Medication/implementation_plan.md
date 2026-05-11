# Implementation Plan - Integrate New Request for Active Prescriptions

The goal is to integrate the "New Request" feature for active prescriptions as shown in the provided images. This involves creating a new component `NewRequest_ActivePrescription_Medication.jsx` that matches the design of the modal and updating `Medication1.jsx` to trigger it.

## Proposed Changes

### Frontend - Medication Components

#### [NEW] [NewRequest_ActivePrescription_Medication.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/components/Patient/Medication/NewRequest_ActivePrescription_Medication.jsx)
- Create a new modal component that matches Image 2 exactly.
- **Endpoint**: Update to `/api/prescriptions/prescription-request/add/`.
- **Payload**: Use `delivery_preference` instead of `delivery_type`.
- **UI**:
    - All-caps labels: "SELECT MEDICATION", "PREFERRED PHARMACY", "DELIVERY PREFERENCE".
    - Icon: Use a pill bottle icon in the top right.
    - Button: "+ New Request" in the main page, and correctly styled buttons in the modal.
- Implement the form logic to fetch medications and pharmacies and submit the request.

#### [MODIFY] [Medication1.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/components/Patient/Medication/Medication1.jsx)
- Import `NewRequest_ActivePrescription_Medication` instead of `New_request`.
- Update the "Active Prescriptions" section to match Image 1.
- Update the "New Request" button text to "+ New Request".
- Ensure the grid of active prescriptions (or the empty state) is properly styled.

## Verification Plan

### Automated Tests
- None possible without live backend.

### Manual Verification
- Open the Medication page.
- Verify the "Active Prescriptions" section has the "+ New Request" button.
- Click the button and verify the new modal opens.
- Check that the modal matches the design in Image 2.
- Verify that the dropdowns are populated and the "Submit Request" button works.
