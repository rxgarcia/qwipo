const DisplayVoteCount = (props) => {
    return (
        <div>
            <div>{props.upvotes}</div>
            <div>{props.downvotes}</div>
        </div>
    );
};

export default DisplayVoteCount;
