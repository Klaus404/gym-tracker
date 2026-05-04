export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
}

export interface Exercise {
  id: number;
  exerciseName: string;
  numberOfReps: number;
  weight: number;
  mentions: string;
  createdAt: string;
  updatedAt: string;
}

export interface Set {
  id: number;
  setNumber: number;
  weight: number;
  reps: number;
  notes: string;
  createdAt: string;
}

export interface Training {
  id: number;
  exerciseName: string;
  workoutDate: string;
  notes: string;
  sets: Set[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  message?: string;
  status?: string;
  user?: T;
  data?: T;
}
