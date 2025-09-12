import "../../css/insights.css";
import insight1 from "../../assets/insight1.png";
import insight2 from "../../assets/insight2.png";

const articles = [
  {
    id: 1,
    img: insight1,
    date: "25 Jan",

    title: "Benefiting From Healthcare Shouldn’t Be A Matter Of Luck",
    desc: "One of the biggest advantages of generic medicines is their low cost. Since manufacturers do not spend extra money on research, branding, and advertisements, the price is much cheaper than branded drugs. This cost-effectiveness helps patients, especially in developing countries, to complete treatments without financial burden.",
  },
  {
    id: 2,
    img: insight2,
    date: "12 Feb",

    title: "Top 10 Tips for Healthy Living",
    desc: "Health is the foundation of a happy and productive life. A healthy body allows us to work, learn, and enjoy daily activities. ",
  },
];

const InsightsSection = () => {
  return (
    <section className="insights-section insightdesktop">
      <h2 className="insights-heading">Read Our Latest Insights & Articles</h2>
      <div className="insights-cards">
        {articles.map((article) => (
          <div className="insights-card" key={article.id}>
            <div className="insights-card-img">
              <img src={article.img} alt={article.title} />
              <div className="insights-date">{article.date}</div>
            </div>
            <div className="insights-card-info">
              <p className="insights-meta">
                {article.author} {article.comments < 10 ? "0" : ""}
                {article.comments}
              </p>
              <h3 className="insights-title">{article.title}</h3>
              <p className="insights-desc">{article.desc}</p>
              <button className="insights-readmore">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsightsSection;
