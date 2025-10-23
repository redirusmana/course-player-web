export interface IInstructor {
  instructor_id: number;
  name: string;
  biography: string;
  photo: string;
}

export interface ICourse {
  course_id: number;
  title: string;
  image: string;
  price: number;
  link_landing_page: string;
  type: number;
  active: number;
  commission: number;
  instructor_role:string;
  instructors: IInstructor[];
  rating: number;
  progress: number;
}

export interface IMyCoursesResponse {
  status: number;
  message: string;
  data: ICourse[];
}

export interface ILesson {
  lesson_id: number;
  chapter_id: number;
  title: string;
  description: string;
  article: string;
  type: number;
  thumbnail_video: string;
  origin_link: string;
  certificate_required: number;

  link: string;
  backup_link: string;

  position: number;
  completed: boolean;
}

export interface IChapter {
  chapter_id: number;
  course_id: number;
  title: string;
  position: number;
  lessons: ILesson[];
}

export interface IDetailCourse extends Omit<ICourse, "progress" | "rating"> {
  chapters: IChapter[];
}

export interface IDetailCourseResponse {
  status: number;
  message: string;
  data: IDetailCourse;
}
