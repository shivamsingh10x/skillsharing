export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  instructor: string;
  duration: string;
  rating: number;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface CourseContextType {
  courses: Course[];
  enrolledCourses: Course[];
  loading: boolean;
  fetchCourses: () => Promise<void>;
  fetchEnrolledCourses: () => Promise<void>;
  enroll: (courseId: string) => Promise<void>;
}