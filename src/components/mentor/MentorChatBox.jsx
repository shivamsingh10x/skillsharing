import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

const MentorChatBox = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample messages for demo
  useEffect(() => {
    setMessages([
      {
        _id: '1',
        studentName: 'John Doe',
        studentEmail: 'john@example.com',
        courseTitle: 'Web Development',
        message: 'I have a doubt about React hooks. Can you explain useEffect?',
        isRead: false,
        createdAt: new Date(),
        reply: null,
      },
      {
        _id: '2',
        studentName: 'Jane Smith',
        studentEmail: 'jane@example.com',
        courseTitle: 'Python Basics',
        message: 'Great course! Very helpful content.',
        isRead: true,
        createdAt: new Date(Date.now() - 3600000),
        reply: 'Thank you for the feedback!',
      },
    ]);
    setUnreadCount(1);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedMessage]);

  const handleSendReply = async () => {
    if (!reply.trim() || !selectedMessage) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMessages(messages.map(m => 
        m._id === selectedMessage._id 
          ? { ...m, reply, repliedAt: new Date() }
          : m
      ));
      setSelectedMessage(null);
      setReply('');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (messageId) => {
    setMessages(messages.map(m => m._id === messageId ? { ...m, isRead: true } : m));
    setUnreadCount(Math.max(0, unreadCount - 1));
  };

  const handleDeleteMessage = (messageId) => {
    if (!window.confirm('Delete this message?')) return;
    setMessages(messages.filter(m => m._id !== messageId));
    if (selectedMessage?._id === messageId) {
      setSelectedMessage(null);
    }
  };

  const displayMessages = selectedMessage ? [selectedMessage] : messages;

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
          zIndex: 999,
        }}
      >
        💬
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              background: '#ef4444',
              color: '#fff',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: 90,
              right: 20,
              width: 'min(400px, 90vw)',
              maxHeight: '600px',
              background: 'var(--bg2)',
              borderRadius: 16,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 998,
              border: '1px solid var(--border)',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                padding: '1rem',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Student Queries</h3>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', opacity: 0.9 }}>
                  {unreadCount} new message{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </motion.button>
            </div>

            {/* Messages List or Detail View */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedMessage ? (
                // Message Detail View
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  {/* Back Button */}
                  <motion.button
                    whileHover={{ x: -4 }}
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      background: 'var(--bg3)',
                      border: 'none',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 8,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textAlign: 'left',
                    }}
                  >
                    ← Back to Messages
                  </motion.button>

                  {/* Student Message */}
                  <div
                    style={{
                      background: 'var(--bg3)',
                      padding: '1rem',
                      borderRadius: 12,
                      borderLeft: '4px solid #6366f1',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>
                          {selectedMessage.studentName}
                        </p>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--text2)' }}>
                          {selectedMessage.studentEmail}
                        </p>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p style={{ margin: '0.75rem 0 0 0', color: 'var(--text)', lineHeight: 1.5 }}>
                      {selectedMessage.message}
                    </p>
                    {selectedMessage.courseTitle && (
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text2)' }}>
                        📚 Course: {selectedMessage.courseTitle}
                      </p>
                    )}
                  </div>

                  {/* Reply if exists */}
                  {selectedMessage.reply && (
                    <div
                      style={{
                        background: '#f0fdf4',
                        padding: '1rem',
                        borderRadius: 12,
                        borderLeft: '4px solid #10b981',
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: '#16a34a' }}>
                        Your Reply
                      </p>
                      <p style={{ margin: '0.75rem 0 0 0', color: '#166534', lineHeight: 1.5 }}>
                        {selectedMessage.reply}
                      </p>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#16a34a' }}>
                        {new Date(selectedMessage.repliedAt).toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Reply Input */}
                  {!selectedMessage.reply && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Type your reply..."
                        style={{
                          padding: '0.75rem',
                          borderRadius: 8,
                          border: '1px solid var(--border)',
                          background: 'var(--bg)',
                          color: 'var(--text)',
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          resize: 'vertical',
                          minHeight: 80,
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSendReply}
                        disabled={loading || !reply.trim()}
                        style={{
                          background: '#6366f1',
                          color: '#fff',
                          border: 'none',
                          padding: '0.75rem',
                          borderRadius: 8,
                          fontWeight: 600,
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading || !reply.trim() ? 0.6 : 1,
                        }}
                      >
                        {loading ? '⏳ Sending...' : '✓ Send Reply'}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ) : (
                // Messages List View
                <>
                  {messages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text2)', padding: '2rem 0' }}>
                      <p style={{ fontSize: '2rem', margin: 0 }}>📭</p>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>No messages yet</p>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <motion.div
                        key={msg._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          setSelectedMessage(msg);
                          if (!msg.isRead) handleMarkAsRead(msg._id);
                        }}
                        style={{
                          background: msg.isRead ? 'var(--bg3)' : 'linear-gradient(135deg,#ede9fe,#f3e8ff)',
                          padding: '0.75rem',
                          borderRadius: 10,
                          cursor: 'pointer',
                          border: msg.isRead ? '1px solid var(--border)' : '1px solid #c4b5fd',
                          transition: 'all 0.2s',
                        }}
                        whileHover={{ x: 4, boxShadow: '0 4px 12px rgba(99,102,241,0.2)' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)' }}>
                              {msg.studentName}
                              {!msg.isRead && <span style={{ marginLeft: '0.5rem', color: '#6366f1' }}>●</span>}
                            </p>
                            <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.7rem', color: 'var(--text2)' }}>
                              {msg.courseTitle}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMessage(msg._id);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text2)',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                            }}
                          >
                            ✕
                          </motion.button>
                        </div>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {msg.message}
                        </p>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.7rem', color: 'var(--text2)' }}>
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </motion.div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MentorChatBox;
