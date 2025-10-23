interface LoadingPageProps {
  text?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ text }) => {
  return <div className="loading-main">{text ?? "Memeriksa Sesi..."}</div>;
};

export default LoadingPage;
