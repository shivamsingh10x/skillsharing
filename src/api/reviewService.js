import axiosInstance from './axiosConfig';

export const getCourseReviews = (courseId) =>
  axiosInstance.get(`/reviews/${courseId}`).then(r => r.data);

export const createReview = (courseId, data) =>
  axiosInstance.post(`/reviews/${courseId}`, data).then(r => r.data);

export const deleteReview = (reviewId) =>
  axiosInstance.delete(`/reviews/${reviewId}`).then(r => r.data);
