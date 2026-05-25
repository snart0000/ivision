import "../styles/Loading.scss";
import logo from "../assets/media/iv-logo.png";

const Loading = () => {
  return (
    <div className="loading">
      <img src={logo} alt="iVision Logo" className="loading__logo" />
    </div>
  );
};

export default Loading;