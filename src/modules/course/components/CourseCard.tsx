import { useNavigate } from "react-router-dom";
import type { ICourse } from "@/core/types/ICourse";
import Star from "@/core/assets/star-icon.webp";
import Blank from "@/core/assets/blank.png";

export const CourseCard: React.FC<{ course: ICourse; number: number }> = ({
  course,
  number,
}) => {
  const navigate = useNavigate();

  const handleContinue = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const mainInstructor = course.instructors?.[0];
  const instructorName = mainInstructor ? mainInstructor.name : "-";
  const instructorPhoto = mainInstructor ? mainInstructor.photo : "-";

  const instructorRole = course?.instructor_role;

  const displayRating = course.rating ? course.rating.toFixed(1) : "";
  const displayIndex = number + 1;

  return (
    <div className="course-card">
      <div className="course-image-container">
        <img
          src={course.image ?? Blank}
          alt={course.title}
          className="course-image"
          onError={(e) => {
            e.currentTarget.src = Blank;
          }}
        />

        <div className="course-badge" title={`Rating: ${displayRating}`}>
          <span className="badge-index">{displayIndex}</span>

          {displayRating && (
            <div className="badge-rating">
              <span>Rating : {displayRating} </span>
              <span className="badge-icon">
                <img src={Star} alt={"badge"} className="badge-icon-star" />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="card-body">
        <h3 className="course-title">{course.title}</h3>

        <div className="instructor-info">
          <img
            src={instructorPhoto ?? Blank}
            alt={instructorName}
            className="instructor-avatar"
            onError={(e) => {
              e.currentTarget.src = Blank;
            }}
          />
          <div className="instructor-info-detail">
            <span className="instructor-name">{instructorName}</span>
            <span>{instructorRole}</span>
          </div>
        </div>

        <button
          onClick={() => handleContinue(course.course_id)}
          className="btn-continue"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
};
