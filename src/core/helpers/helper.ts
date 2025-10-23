import type { IDetailCourse, ILesson } from "../types/ICourse";

const extractVideoId = (url: string): string | null => {
  const regex = /(?:v=|youtu\.be\/|embed\/|v\/)([^&?#/]+)/;
  const match = regex.exec(url);
  return match?.[1] ?? null;
};

export const getYoutubeEmbedUrl = (lesson: ILesson | null): string | null => {
  const linksToCheck = [lesson?.link, lesson?.backup_link];
  for (const url of linksToCheck) {
    if (url && url.length > 0) {
      const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");

      if (isYoutube) {
        const videoId = extractVideoId(url);

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (url.includes("youtube.com/embed/")) {
          return url;
        }
      }
    }
  }

  return null;
};

export const getFlatTitle = (
  detailCourse: IDetailCourse,
  currentLesson: ILesson | null
): string => {
  if (!currentLesson) return "Memuat Materi...";

  const courseTitle = detailCourse.title || "";
  const chapter = detailCourse.chapters.find(
    (c) => c.chapter_id === currentLesson.chapter_id
  );
  const chapterTitle = (chapter ? chapter.title : "") || "";
  const lessonTitle = currentLesson.title || "Materi Tanpa Judul";

  return `${lessonTitle} | Bab: ${chapterTitle} | Kelas: ${courseTitle}`;
};
