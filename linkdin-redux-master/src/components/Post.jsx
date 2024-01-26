import { Button, Card, CardBody, CardHeader, Form, FormControl, Image } from "react-bootstrap";
import { it } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { FaHeart, FaRegCommentDots, FaShareSquare, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/slice/fetchCommentsReducer";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const Post = ({ username, text, createdAt, user, postImg, allComments, postId, likes, numberOfComments }) => {
	const dispatch = useDispatch();
	const timeSinceCreated = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: it });
	let isItMyProfile = false;
	const myProfile = useSelector((state) => state.fetchMyProfile.data);

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");

	useEffect(() => {
		setComments(allComments.filter((comment) => comment.elementId === postId));
	}, [allComments, postId]);

	if (myProfile && user === myProfile._id) {
		isItMyProfile = true;
	}

	return (
		<Card className="my-1">
			<CardHeader>
				<div className="d-flex align-itmes-center">
					<div className="d-flex justify-content-center align-items-center">
						<Link to={"/profile/" + user}>
							<FaUserCircle className="fs-2 me-3" />
						</Link>
					</div>
					<div className="d-flex flex-column">
						<Link
							to={isItMyProfile ? `/profile/me` : `/profile/${user}`}
							className="mb-0"
							style={{ textDecoration: "none", color: "black" }}
						>
							{username && username}
						</Link>
						<small className="text-muted">{timeSinceCreated}</small>
					</div>
				</div>
			</CardHeader>
			<CardBody>
				<p className="mb-2">{text}</p>
				{postImg && <Image src={postImg} className="w-100 scale" />}
			</CardBody>
			<Card.Footer className="d-flex align-items-center">
				<Button variant="link" className="d-flex align-items-center text-decoration-none ps-0 text-secondary">
					<FaHeart className="me-1 mb-0" /> {likes}
				</Button>
				<Button
					variant="link"
					className="d-flex align-items-center text-decoration-none text-secondary"
					onClick={() => setShowComments(!showComments)}
				>
					<FaRegCommentDots className="me-1 mb-0 " /> {comments.length} commenti
				</Button>
				<Button variant="link" className="d-flex align-items-center text-decoration-none text-secondary">
					<FaShareSquare className="me-1 mb-0" /> Condividi
				</Button>
			</Card.Footer>
			{showComments && allComments && comments.length > 0 && (
				<div className="py-2 border border-1 border-light-secondary border-top-0 border-end-0 border-start-0 ">
					{comments.map((comment) => (
						<Comment key={comment._id} author={comment.author} comment={comment.comment} />
					))}
				</div>
			)}
			<Form
				onSubmit={(event) => {
					event.preventDefault();

					const commentToPost = {
						comment: commentText,
						rate: 3,
						elementId: postId,
					};

					dispatch(addComment(commentToPost));
					comments.push({ ...commentToPost, author: myProfile.username });
					setCommentText("");
				}}
			>
				<div className="d-flex align-items-center px-3 py-2">
					<div className="me-2">
						<img
							src={myProfile && myProfile.image}
							alt="profile"
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
						/>
					</div>
					<FormControl
						value={commentText}
						className="rounded-pill"
						placeholder="Scrivi un commento"
						onChange={(e) => setCommentText(e.target.value)}
					/>
				</div>
			</Form>
		</Card>
	);
};
export default Post;
