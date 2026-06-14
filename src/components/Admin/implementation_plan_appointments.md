# Implementation Plan - Integrate Appointments with Filters

Integrate the appointments list with backend API (`/api/appointments/list/`) and implement filtering by Date and Status (ALL, CONFIRMED, PENDING, CANCELLED).

## User Review Required

> [!IMPORTANT]
> The backend view `list_appointments` currently only filters by `doctor_id` and `date`. I will extend it to support a `status` query parameter.

## Proposed Changes

### Backend

#### [MODIFY] [appointments/views.py](file:///d:/directory/UPDATED_VAIDYAGO/vaidyaGo/vaidyaGo/appointments/views.py)
- Update `list_appointments` to filter by `status` if provided in query parameters.
- Ensure case-insensitive matching for status if necessary (though choices are lowercase).

#### [MODIFY] [appointments/serializers.py](file:///d:/directory/UPDATED_VAIDYAGO/vaidyaGo/vaidyaGo/appointments/serializers.py)
- Add `doctor_name` SerializerMethodField to return the full name of the doctor.

---

### Frontend

#### [MODIFY] [Appointment2.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/component/Day1/Doctor/Appointment2.jsx)
- Import `apiFetch` and `BASE_URL`.
- Add state:
    - `appointmentsList` (replaces hardcoded `appointments` array).
    - `isLoading` for loading states.
- Implement `fetchAppointments`:
    - Construct URL with `date` (formatted as YYYY-MM-DD) and `status`.
    - Update `appointmentsList` with mapped data from backend.
- Update `useEffect`:
    - Trigger `fetchAppointments` when `currentDate` or `activeTab` changes.
- Update table rendering:
    - Map backend fields to UI rows.

## Verification Plan

### Automated Tests
- Verify API response via browser or curl with status filters:
    - `GET /api/appointments/list/?status=confirmed`
    - `GET /api/appointments/list/?date=2026-02-14`

### Manual Verification
- Open Admin Dashboard -> Appointments.
- Change the date; verify list updates.
- Switch between status tabs; verify list updates.
- Click "view" to ensure modal still works.
