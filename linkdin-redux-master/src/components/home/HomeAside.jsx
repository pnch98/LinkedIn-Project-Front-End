import { Col, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useState } from "react";
import { TbInfoSquareFilled } from "react-icons/tb";
import MiniFooter from "./MiniFooter";
import BannerCard from "./BannerCard";
import { useSelector } from "react-redux";

const HomeAside = () => {
	const [showMore, setShowMore] = useState(false);
	let postList = useSelector((state) => state.fetchPost.postList || []);
	const [showCount, setShowCount] = useState(5);

	const handleShowMore = () => {
		setShowMore(!showMore);
		setShowCount(showCount === 5 ? 10 : 5);
	};

	const visibleNews = [...postList].reverse().slice(0, showCount);

	return (
		<>
			<Card className="d-flex flex-column align-items-start mb-2 pt-2 pb-3 bg-white rounded px-2">
				<div className="d-flex justify-content-between align-items-baseline w-100 px-2">
					<h5 className="mb-1">LinkedIn Notizie</h5>

					<TbInfoSquareFilled className="ms-1" />
				</div>
				<div className=" py-1 text-start">
					<div className="py-0 list-unstyled">
						{visibleNews.map((post, index) => (
							<ListGroupItem
								key={post._id || index}
								className="border border-1 border-light-secondary border-start-0 border-end-0 border-bottom-0 hover"
								style={{ maxHeight: "76px", overflowY: "hidden", maxWidth: "245px", overflowX: "auto" }}
							>
								<p className="mb-0">{post.user.username && post.user.username}</p>
								<p className="mb-2">{post.text}</p>
							</ListGroupItem>
						))}
					</div>
					<Button
						variant="transparent"
						className="fw-bold"
						style={{ border: "none", color: "gray" }}
						size="sm"
						onClick={handleShowMore}
					>
						{showMore ? "Mostra Meno" : "Mostra Altri"}
					</Button>
				</div>
			</Card>
			<div className="position-sticky bannerTop">
				<BannerCard />
				<MiniFooter />
			</div>
		</>
	);
};

export default HomeAside;
