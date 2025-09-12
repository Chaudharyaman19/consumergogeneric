import "../../css/youtube.css";

const VideoSection = () => {
  return (
    <section className="video-section">
      <h2 className="video-section-heading">Watch Our Video</h2>
      <div className="video-container">
        <iframe
          width="1206"
          height="678"
          src="https://www.youtube.com/embed/PjT9ZLMdn8s"
          title="Go Generic Healthcare | Affordable Medicines &amp; Expert Care in Delhi NCR"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
