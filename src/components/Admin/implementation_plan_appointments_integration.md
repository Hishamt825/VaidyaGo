# Task: Integrate Appointments API in Appointment2.jsx

The goal is to ensure the `Appointment2.jsx` component is fully integrated with the `/api/appointments/list/` backend endpoint, including the display of patient gender and age.

## Proposed Changes

### Backend

#### [MODIFY] [appointments/models.py](file:///d:/directory/UPDATED_VAIDYAGO/vaidyaGo/vaidyaGo/appointments/models.py)
- Add `patient_gender` field to the `Appointment` model.

#### [MODIFY] [appointments/serializers.py](file:///d:/directory/UPDATED_VAIDYAGO/vaidyaGo/vaidyaGo/appointments/serializers.py)
- Include `patient_gender` in the `fields` list.

### Frontend

#### [MODIFY] [Appointment2.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/component/Day1/Doctor/Appointment2.jsx)
- Update the data mapping in `fetchAppointments` to use `appt.patient_gender`.
- Ensure the table correctly displays gender and age.

## Verification Plan

### Automated Tests
- None possible without live backend, but I will check the code logic.

### Manual Verification
- Verify the appointment list loads data from the backend.
- Verify status tabs filter the list correctly.
- Verify date navigation updates the list.
