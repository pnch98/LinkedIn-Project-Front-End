import { Col, Row } from "react-bootstrap";
import ProfileCardHome from "./ProfileCardHome";
import HomeMain from "./HomeMain";
import HomeAside from "./HomeAside";
import { useDispatch } from "react-redux";

const Home = () => {
	const dispatch = useDispatch();

	return (
		<Row className="my-4">
			<div className="col-4of20 flex-shrink-0">
				<ProfileCardHome />
			</div>
			<div className="col-11of20 flex-shrink-0 flex-grow-1">
				<HomeMain />
			</div>
			<div className="col-5of20 flex-shrink-0">
				<HomeAside />
			</div>
		</Row>
	);
};

export default Home;
