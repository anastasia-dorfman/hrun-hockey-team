import React from "react";
import { useLoaderData } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Wrapper from "../assets/wrappers/TeamHistory.js";
import MilestoneCard from "../components/MilestoneCard.jsx";
import Breadcrumb from "../components/shared/Breadcrumb";
import { mockMilestones } from "../data/mockData.js";

const useMockData = true;

export const loader = async ({ request }) => {
  try {
    if (useMockData) {
      return { data: { milestones: mockMilestones } };
    }
    const { data } = await customFetch.get("/milestones");
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const TeamHistory = () => {
  const { data } = useLoaderData();
  const milestones = data.milestones || [];
  const breadcrumbLinks = [
    { address: "team", linkText: "Team" },
    { address: "", linkText: `History` },
  ];

  return (
    <Wrapper>
      <Breadcrumb links={breadcrumbLinks} />
      <div className="history-container">
        <div className="text">
          <h1 className="page-title">Our Team History</h1>
          <p className="first b1">
            Founded in [Year], [Your Team's Name] has grown from humble
            beginnings into a formidable force in the hockey world. Our journey
            started when a group of passionate hockey enthusiasts came together
            with a shared dream: to create a team that embodies dedication,
            sportsmanship, and the spirit of the game.
          </p>
          <div className="second">
            <h2>Early Years</h2>
            <p className="b1">
              In the early years, our team faced many challenges, from securing
              funding to finding a permanent home rink. Despite these obstacles,
              our players' passion and perseverance paid off. Through hard work
              and determination, we began to make a name for ourselves in local
              leagues, earning respect and recognition for our competitive
              spirit and sportsmanship.
            </p>
          </div>
        </div>
        <img src="/assets/images/team_history.png" alt="Team Image" />
      </div>
      <h2>Achievements and Milestones</h2>
      <div className="milestones-desc">
        <p className="b1">
          Our history is marked by numerous milestones and achievements. From
          winning our first championship in [Year] to establishing a renowned
          youth development program, each success has been a testament to our
          team's hard work and unity. Highlights include:
        </p>
      </div>
      <div className="milestones-container">
        {milestones.map((m) => (
          <MilestoneCard
            key={m._id}
            title={m.title}
            desc={m.description}
            img={m.img}
          />
        ))}
      </div>
      <div className="join-container">
        <div className="about">
          <div className="text">
            <h1>Join Us</h1>
            <p className="b1">
              Whether you’re a die-hard fan, a curious newcomer, or a potential
              player, we invite you to join the Castors family. Follow our
              journey, support our games, and share in the excitement of hockey
              at its finest. Stay tuned to our website for the latest news, game
              schedules, player updates, and more. Together, we are unstoppable.
            </p>
          </div>
          <button className="button selected long contact-us">
            <HashLink smooth to="/#contact-us-section">
              Contact Us
            </HashLink>
          </button>
        </div>
        <img src="/assets/images/history_join-us.png" alt="Join Us Image" />
      </div>
    </Wrapper>
  );
};

export default TeamHistory;
