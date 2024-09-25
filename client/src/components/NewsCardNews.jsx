import React from "react";
import { Link } from "react-router-dom";
import { getDateString } from "../utils/functions";
import Wrapper from "../assets/wrappers/NewsCardNews";

const NewsCardNews = ({ id, date, img, title, content, showTitle = true }) => {
  const formattedDate = getDateString(new Date(date), false);

  const truncateContent = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return `${truncated.slice(0, lastSpaceIndex)} ...`;
  };

  return (
    <Wrapper>
      {showTitle && <h3>{title}</h3>}
      <div className="image-container">
        <img src={img} alt={title} />
        <div className="date-overlay b1">{formattedDate}</div>
      </div>
      <p>{truncateContent(content, 305)}</p>
      <div className="button-container">
        <button className="read-more b2">
          <Link to={`/news/${id}`}>Read more</Link>
        </button>
      </div>
    </Wrapper>
  );
};

export default NewsCardNews;
