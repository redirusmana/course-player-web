import type { IDetailCourse, ILesson } from "@/core/types/ICourse";

export const CourseDetailTitle = (
  detailCourse: IDetailCourse,
  currentLesson: ILesson | null
): React.ReactNode => {
  if (!currentLesson) return "Memuat Materi...";

  const courseTitle = detailCourse.title || "";

  const chapter = detailCourse.chapters.find(
    (c) => c.chapter_id === currentLesson.chapter_id
  );
  const chapterTitle = (chapter ? chapter.title : "") || "";

  const lessonTitle = currentLesson.title || "-";

  const contextParts: string[] = [];

  if (courseTitle) {
    contextParts.push(`Course: ${courseTitle}`);
  }

  if (chapterTitle) {
    contextParts.push(`Chapter: ${chapterTitle}`);
  }

  const contextString = contextParts.join(" | ");

  return (
    <>
      <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
        {lessonTitle}
      </span>

      {!!contextString && (
        <>
          <br />
          <span
            style={{ fontSize: "0.75em", opacity: 0.8, fontWeight: "normal" }}
          >
            {contextString}
          </span>
        </>
      )}
    </>
  );
};
