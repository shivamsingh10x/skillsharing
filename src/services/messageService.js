import axiosInstance from '../api/axiosConfig';

export const messageService = {
  // Get all messages for mentor
  getMentorMessages: async (mentorId, limit = 50) => {
    try {
      const { data } = await axiosInstance.get(`/messages/mentor/${mentorId}?limit=${limit}`);
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Get unread message count
  getUnreadCount: async (mentorId) => {
    try {
      const { data } = await axiosInstance.get(`/messages/unread/${mentorId}`);
      return data;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },

  // Send reply to student
  sendReply: async (messageId, reply) => {
    try {
      const { data } = await axiosInstance.post(`/messages/${messageId}/reply`, { reply });
      return data;
    } catch (error) {
      console.error('Error sending reply:', error);
      throw error;
    }
  },

  // Mark message as read
  markAsRead: async (messageId) => {
    try {
      const { data } = await axiosInstance.put(`/messages/${messageId}/read`);
      return data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      const { data } = await axiosInstance.delete(`/messages/${messageId}`);
      return data;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },
};
