# Admin Dashboard Balance Integration

The goal is to implement a dynamic "Balance" dialogue box that pops up when the admin clicks on the Balance card in the dashboard. This dialogue will provide detailed financial information, including income breakdown and transaction history.

## Proposed Changes

### [Admin_dashboard1.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/components/Admin/Admin_dashboard1.jsx)

#### [MODIFY] [Admin_dashboard1.jsx](file:///d:/directory/UPDATED_VAIDYAGO/vaidyago_frontend/VaidyaGo/src/components/Admin/Admin_dashboard1.jsx)
- Add `showBalanceModal` state using `useState`.
- Implement `onClick` handler for the Balance card to trigger the modal.
- Add the `BalanceModal` JSX using `AnimatePresence` and `framer-motion`.
- The modal will feature:
    - **Header**: Title and close button.
    - **Summary Section**: Total balance, Income, Expenses (mock).
    - **Chart Section**: A detailed AreaChart for earnings.
    - **Transaction List**: A list of recent transactions with status and amount.
    - **Actions**: Buttons for "Withdraw" or "Download Report".

## Verification Plan

### Automated Tests
- Use the browser subagent to:
    1. Navigate to the Admin Dashboard.
    2. Locate the "Balance" card.
    3. Click the card and verify the modal appears.
    4. Verify modal content (Balance, Transactions).
    5. Close the modal and verify it disappears.

### Manual Verification
- Verify the modal's responsiveness on different screen sizes.
- Ensure the animations are smooth and consistent with other dashboard modals.
