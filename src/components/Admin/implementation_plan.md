# Admin Dashboard Integration: Active Doctor Cards & Filters

The goal is to replace hardcoded doctor data and counts with dynamic data from the `approved_doctors` API. We will also add specialty-based filtering to the dashboard to match the requested design.

## Proposed Changes

### [Frontend] Admin Dashboard & Doctor Management

#### [MODIFY] [Admin_dashboard1.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/components/Admin/Admin_dashboard1.jsx)
- **Dynamic Stat Cards**:
    - Fetch counts for All, Active (Approved), Pending, and Rejected doctors.
    - Update the top grid cards with these real numbers.
- **Data Integration**:
    - Use the existing `fetchDoctors` logic but ensure it correctly updates for all statuses.

#### [MODIFY] [admin-doctor.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/components/Admin/admin-doctor.jsx)
- **Complete API Integration**:
    - Replace `doctorsData` (hardcoded) with a dynamic `doctors` state.
    - Fetch data based on the current view (`active`, `pending`, `rejected`) using:
        - `${BASE_URL}/accounts/doctors/approved/` (for Active)
        - `${BASE_URL}/accounts/doctors/pending/` (for Pending)
        - `${BASE_URL}/accounts/doctors/rejected/` (for Rejected)
- **Specialty Filtering**:
    - Apply specialty filtering (ALL, CARDIOLOGIST, etc.) to the dynamic list of doctors.
- **Dynamic Stat Cards**:
    - Update the top stat cards (Total, Active, Pending, Rejected) to display real counts from the APIs.

## Verification Plan

### Automated Tests
- I will use the browser tool to navigate to the Admin Dashboard and verify:
    - The "Active Doctors" card shows the correct count from the API.
    - The specialty filters correctly update the displayed list of doctors.
    - The doctor cards display real data (names, specialties).

### Manual Verification
- Verify that clicking on a specialty (e.g., "CARDIOLOGIST") only shows doctors with that specialization.
- Check that the UI remains premium and responsive across different screen sizes.
