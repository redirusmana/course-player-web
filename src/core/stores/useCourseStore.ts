import { create } from "zustand";
import type { ICourse, IDetailCourse, ILesson } from "@/core/types/ICourse";

interface CourseState {
  courses: ICourse[];
  detailCourse: IDetailCourse | null;
  currentLesson: ILesson | null;

  currentLessonIndex: number;

  isLoading: boolean;
  error: string | null;

  setMyCourses: (courses: ICourse[]) => void;
  setDetailCourse: (detail: IDetailCourse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  setNextLesson: () => void;
  setPrevLesson: () => void;
  resetCourseState: () => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  detailCourse: null,
  currentLesson: null,
  currentLessonIndex: -1,
  isLoading: false,
  error: null,

  setMyCourses: (courses) =>
    set({ courses: courses, isLoading: false, error: null }),

  setDetailCourse: (detail) => {
    const orderedLessons = getOrderedLessons(detail);
    const firstLesson = orderedLessons[0] || null;

    set({
      detailCourse: detail,
      currentLesson: firstLesson,
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error: error, isLoading: false }),

  setNextLesson: () => {
    const { detailCourse, currentLesson } = get();
    if (!detailCourse || !currentLesson) return;

    const allLessons = getOrderedLessons(detailCourse);

    const currentIndex = allLessons.findIndex(
      (l) => l.lesson_id === currentLesson.lesson_id
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < allLessons.length) {
      set({ currentLesson: allLessons[nextIndex] });
    }
  },

  setPrevLesson: () => {
    const { detailCourse, currentLesson } = get();
    if (!detailCourse || !currentLesson) return;

    const allLessons = getOrderedLessons(detailCourse);

    const currentIndex = allLessons.findIndex(
      (l) => l.lesson_id === currentLesson.lesson_id
    );
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      set({ currentLesson: allLessons[prevIndex] });
    }
  },

  resetCourseState: () =>
    set({
      courses: [],
      detailCourse: null,
      currentLesson: null,
      currentLessonIndex: -1,
      isLoading: false,
      error: null,
    }),
}));

const getOrderedLessons = (detailCourse: IDetailCourse | null): ILesson[] => {
  if (!detailCourse) return [];

  const allLessons = detailCourse.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      ...lesson,
      chapterTitle: chapter.title,
      chapterPosition: chapter.position,
    }))
  );

  const lessonsToSort = [...allLessons];

  lessonsToSort.sort((a, b) => {
    if (a.chapterPosition !== b.chapterPosition) {
      return a.chapterPosition - b.chapterPosition;
    }
    return a.position - b.position;
  }) as ILesson[];

  return lessonsToSort as ILesson[];
};
