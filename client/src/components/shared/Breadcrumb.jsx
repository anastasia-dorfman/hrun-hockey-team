import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Breadcrumb";

const Breadcrumb = ({ links }) => (
  <Wrapper>
    <nav className="breadcrumb">
      <div className="b4">
        {links.slice(0, -1).map((link) => (
          <span key={link.linkText}>
            <Link to={`/${link.address}`}>{link.linkText}</Link>
            &gt;
          </span>
        ))}
        <span>
          <b>{links[links.length - 1].linkText}</b>
        </span>
      </div>
    </nav>
  </Wrapper>
);

export default Breadcrumb;
