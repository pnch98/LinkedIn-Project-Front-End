const Comment = ({ comment, author }) => {
  return (
    <div className="d-flex my-1 px-2">
      <div className="me-2">
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          alt="foto profilo"
          style={{ width: "35px", borderRadius: "50%" }}
        />
      </div>
      <div className="w-100">
        <div className="px-2 pb-1 commentRadius" style={{ backgroundColor: "#f1f1f1" }}>
          <div>
            <p className="my-0 py-0">
              <strong>{author}</strong>
            </p>
          </div>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
