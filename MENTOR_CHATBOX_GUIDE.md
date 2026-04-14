# 💬 Real-Time Mentor Chat Box - Complete Guide

## Overview

A beautiful, real-time chat box for mentors to receive and respond to student queries directly from the dashboard.

## Features

### ✨ Chat Box Features
- **Real-time notifications** - Floating chat button with unread count badge
- **Message list** - View all student queries organized by date
- **Message detail view** - Click to expand and read full message
- **Quick reply** - Send replies directly from the chat box
- **Mark as read** - Automatically marks messages as read when opened
- **Delete messages** - Remove messages you don't need
- **Smooth animations** - Framer Motion animations for smooth UX
- **Responsive design** - Works on all screen sizes
- **Auto-polling** - Fetches new messages every 5 seconds

### 📊 Message Information
- Student name and email
- Course title (if applicable)
- Message category (doubt, feedback, complaint, general)
- Priority level (low, medium, high)
- Timestamp
- Reply status

## Files Created

### Frontend
1. **`src/components/mentor/MentorChatBox.jsx`** - Main chat box component
2. **`src/services/messageService.js`** - Message API service
3. **Updated `src/components/mentor/MentorDashboardEnhanced.jsx`** - Integrated chat box

### Backend
1. **`backend/models/Message.js`** - Message database model
2. **`backend/routes/messageRoutes.js`** - Message API endpoints
3. **Updated `backend/server.js`** - Added message routes

## How It Works

### 1. Chat Box Button
- Fixed position at bottom-right of screen
- Shows unread message count badge
- Click to open/close chat box
- Smooth scale animation

### 2. Message List View
- Shows all messages from students
- Unread messages highlighted in purple
- Click any message to view details
- Delete button on each message

### 3. Message Detail View
- Full message content
- Student information
- Course information
- Existing reply (if any)
- Reply input box (if no reply yet)
- Back button to return to list

### 4. Real-Time Updates
- Polls for new messages every 5 seconds
- Auto-updates unread count
- Smooth animations for new messages

## API Endpoints

### Get Mentor Messages
```
GET /api/messages/mentor/:mentorId?limit=50
```
Returns: `{ messages: [], unreadCount: 0 }`

### Get Unread Count
```
GET /api/messages/unread/:mentorId
```
Returns: `{ unreadCount: 0 }`

### Send Message (Student)
```
POST /api/messages
Body: {
  mentorId: "...",
  courseId: "...",
  courseTitle: "...",
  message: "...",
  category: "doubt|feedback|complaint|general",
  priority: "low|medium|high"
}
```

### Send Reply
```
POST /api/messages/:messageId/reply
Body: { reply: "..." }
```

### Mark as Read
```
PUT /api/messages/:messageId/read
```

### Delete Message
```
DELETE /api/messages/:messageId
```

### Get Student Messages
```
GET /api/messages/student/:studentId?limit=50
```

## Usage

### For Mentors
1. Open mentor dashboard
2. Chat box button appears at bottom-right
3. Click to open chat box
4. View all student queries
5. Click any message to read full content
6. Type reply and click "Send Reply"
7. Message is sent and marked as replied

### For Students
Students can send messages through:
- Course detail page
- Course player page
- Student dashboard

## Customization

### Change Polling Interval
In `MentorChatBox.jsx`:
```javascript
const interval = setInterval(fetchMessages, 5000); // Change 5000 to desired ms
```

### Change Chat Box Position
```javascript
style={{
  position: 'fixed',
  bottom: 20,  // Change this
  right: 20,   // Or this
}}
```

### Change Colors
```javascript
background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' // Change gradient
```

### Change Animation Speed
```javascript
transition={{ duration: 0.3 }} // Change duration
```

## Message Categories

- **Doubt** - Student has a question about course content
- **Feedback** - Student providing feedback on course
- **Complaint** - Student reporting an issue
- **General** - General inquiry

## Priority Levels

- **Low** - Can be answered later
- **Medium** - Should be answered soon
- **High** - Urgent, needs immediate attention

## Features to Add Later

- [ ] Message search
- [ ] Filter by category/priority
- [ ] Typing indicator
- [ ] Message read receipts
- [ ] Attachment support
- [ ] Message templates
- [ ] Auto-reply feature
- [ ] Message scheduling
- [ ] Analytics dashboard
- [ ] WebSocket for real-time updates

## Troubleshooting

### Chat box not showing
- Check if `MentorChatBox` is imported in dashboard
- Verify component is rendered in return statement
- Check browser console for errors

### Messages not loading
- Verify backend routes are added to server.js
- Check Message model is created
- Verify API endpoints are working (test with Postman)
- Check network tab in browser dev tools

### Animations not smooth
- Ensure Framer Motion is installed
- Check for heavy computations
- Reduce number of simultaneous animations

### Real-time updates not working
- Check polling interval is set correctly
- Verify API is returning data
- Check browser console for errors
- Increase polling interval if server is slow

## Performance Tips

1. **Limit message history** - Only fetch last 50 messages
2. **Lazy load** - Load messages only when chat box opens
3. **Debounce** - Debounce rapid API calls
4. **Cache** - Cache messages locally to reduce API calls
5. **Pagination** - Implement pagination for large message lists

## Security

- ✅ Authentication required for all endpoints
- ✅ Mentors can only see their own messages
- ✅ Students can only send to their mentors
- ✅ Messages are stored in database
- ✅ Timestamps for audit trail

## Next Steps

1. ✅ Test chat box in browser
2. ✅ Send test messages from student account
3. ✅ Verify mentor receives messages
4. ✅ Test reply functionality
5. ✅ Deploy to production

---

**Status**: ✅ Ready to use! Beautiful real-time chat for mentors.
