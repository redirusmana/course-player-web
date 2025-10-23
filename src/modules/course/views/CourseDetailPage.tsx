import React, { lazy, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCourseStore } from "@/core/stores/useCourseStore";
import { courseService } from "@/core/services/courseServices";
import type { ILesson } from "@/core/types/ICourse";
import { getFlatTitle, getYoutubeEmbedUrl } from "@/core/helpers/helper";
import { CourseDetailHeader } from "@/modules/course/components/CourseDetailHeader";
import { CourseDetailTitle } from "@/modules/course/components/CourseDetailTitle";

const LoadingPage = lazy(() => import("@/core/components/LoadingPage"));

import "../styles/CourseDetailPage.css";
import "../styles/CoursePage.css";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const {
    detailCourse,
    currentLesson,
    setNextLesson,
    setPrevLesson,
    isLoading,
    error,
  } = useCourseStore();

  const courseIdNumber = courseId ? Number.parseInt(courseId) : undefined;

  useEffect(() => {
    if (courseIdNumber) {
      courseService.fetchDetailCourse(courseIdNumber);
    }
  }, [courseIdNumber]);

  const allLessons: ILesson[] = useMemo(() => {
    if (!detailCourse) return [];

    return detailCourse.chapters
      .flatMap((chapter) => chapter.lessons)
      .sort((a, b) => a.position - b.position);
  }, [detailCourse]);

  const currentLessonIndex = allLessons.findIndex(
    (lesson) => lesson.lesson_id === currentLesson?.lesson_id
  );

  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === allLessons.length - 1;

  if (isLoading || !detailCourse) {
    return <LoadingPage text="Memuat Detail Materi Kursus..." />;
  }

  if (error) {
    return (
      <div className="course-detail-page">
        <CourseDetailHeader />
        <div className="course-detail-status" style={{ color: "red" }}>
          Error: {error}
        </div>
      </div>
    );
  }

  const finalEmbedUrl = getYoutubeEmbedUrl(currentLesson);

  const displayJSXTitle =
    currentLesson && detailCourse
      ? CourseDetailTitle(detailCourse, currentLesson)
      : "Memuat Materi...";

  const displayStringTitle =
    currentLesson && detailCourse
      ? getFlatTitle(detailCourse, currentLesson)
      : "Memuat Materi...";

  return (
    <div className="course-detail-page">
      <CourseDetailHeader />

      <div className="course-detail-content">
        <h1 className="lesson-title">{displayJSXTitle}</h1>

        <div className="video-container">
          {finalEmbedUrl ? (
            <iframe
              className="video-player-frame"
              key={finalEmbedUrl}
              src={finalEmbedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={displayStringTitle}
            ></iframe>
          ) : (
            <div className="video-player-text-not-found">
              Video Player Gagal dimuat. <br />
              Hanya mendukung link YouTube yang valid.
            </div>
          )}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          onClick={setPrevLesson}
          className="btn-nav btn-prev"
          disabled={isFirstLesson || !currentLesson}
        >
          {"< Sebelumnya"}
        </button>

        <button
          onClick={setNextLesson}
          className="btn-nav btn-next"
          disabled={isLastLesson || !currentLesson}
        >
          {"Selanjutnya >"}
        </button>
      </div>
    </div>
  );
};

export default CourseDetailPage;
