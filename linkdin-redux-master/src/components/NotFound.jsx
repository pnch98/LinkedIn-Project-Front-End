import { NavLink } from "react-router-dom";

const NotFound = (props) => {
	return (
		<>
			<div className="text-center mt-5">
				<h1 className="display-3 text-primary">404 - Page not Found!</h1>
				{/* <p className="lead text-light">L'informazione che cercavi non è disponibile.</p> */}
				<NavLink to="/" className={"nav-link text-primary p-2 my-5"}>
					Back Home
				</NavLink>
			</div>
		</>
	);
};
export default NotFound;
