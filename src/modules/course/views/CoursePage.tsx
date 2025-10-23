import React, { lazy, useEffect } from "react";
import { useCourseStore } from "@/core/stores/useCourseStore";
import { courseService } from "@/core/services/courseServices";
import { NavBar } from "@/modules/course/components/NavBar";
import { CourseCard } from "@/modules/course/components/CourseCard";

const LoadingPage = lazy(() => import("@/core/components/LoadingPage"));
import "@/modules/course/styles/CoursePage.css";

const CoursePage: React.FC = () => {
  const { courses, isLoading, error } = useCourseStore();

  useEffect(() => {
    courseService.fetchMyCourses();
  }, []);

  if (isLoading) {
    return <LoadingPage text="Memuat daftar kelas..." />;
  }

  if (error) {
    return <div className="course-main-content error-text">Error: {error}</div>;
  }

  return (
    <div className="course-page">
      <NavBar />

      <div className="course-main-content">
        <h2 className="section-title">Kelas ({courses.length})</h2>

        {courses.length === 0 ? (
          <p className=" empty-text">
            Anda belum memiliki kelas.
          </p>
        ) : (
          <div className="course-grid">
            {courses.map((course, index) => (
              <CourseCard
                key={course.course_id}
                course={course}
                number={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
