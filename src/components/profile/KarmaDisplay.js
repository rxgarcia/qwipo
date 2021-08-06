import "../../styles/KarmaDisplay.css";

const KarmaDisplay = (props) => {
  const silderPosition =
    (props.upvotes / (props.upvotes + props.downvotes)) * 100;
  console.log(silderPosition);

  return (
    <div className="karma-display-div">
      ⬆️ {props.upvotes}
      <input
        className="karma-display-slider"
        type="range"
        value={silderPosition}
        readOnly={true}
      />
      {props.downvotes} ⬇️
    </div>
  );
};

export default KarmaDisplay;
