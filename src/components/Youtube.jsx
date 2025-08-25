import "../css/youtube.css";

const VideoSection = () => {
  return (
    <section className="video-section">
      <h2 className="video-section-heading">Watch Our Video</h2>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/eErBbCNj2Po"
          title="Go Generic Healthcare | Affordable Medicines & Expert Care in Delhi NCR"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
