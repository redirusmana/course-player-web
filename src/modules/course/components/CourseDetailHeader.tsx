import { useNavigate } from "react-router-dom";

export const CourseDetailHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToCourses = () => {
    navigate("/course");
  };

  return (
    <div className="navbar-detail">
      <div className="navbar-content">
        <div className="navbar-button">
          <button onClick={handleBackToCourses} className="btn-nav btn-prev">
            Kembali ke Kelas
          </button>
        </div>
      </div>
    </div>
  );
};
