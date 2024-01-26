function InfoModal() {
	return (
		<Modal show={show} onHide={handleClose} dialogClassName="my-custom-modal">
			<Modal.Header closeButton>
				<Modal.Title>{profile && profile.name + " " + profile.surname}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="mx-2">
					<div className="d-flex align-items-center justify-content-between">
						<FormText className="fs-5 text-black">Informazioni di contatto</FormText>

						{location.pathname === "/profile/me" && (
							<Button
								className="pencil px-2"
								onClick={() => {
									handleClose();
									handleShowSecond();
								}}
							>
								<GoPencil className="fs-4" />
							</Button>
						)}
					</div>
					<Form.Group className="my-3 d-flex align-items-start" controlId="exampleForm.ControlInput1">
						<Linkedin className="ms-1 me-3 mt-1 fs-5" />
						<Form.Label className="fw-semibold">
							Il tuo profilo
							{profile ? (
								<NavLink className="nav-link text-primary" to={"/profile/me"}>
									linkedi.com/in/{profile && profile.name}-{profile.surname && profile.surname}-45fde57321
								</NavLink>
							) : (
								"Registrati per visualizzare le informazioni di contatto"
							)}
						</Form.Label>
					</Form.Group>
					<Form.Group className="mb-3 d-flex align-items-start" controlId="exampleForm.ControlInput2">
						<FaPhoneAlt className="ms-1 me-3 mt-1 fs-5" />
						<Form.Label className="fw-semibold">
							Telefono
							<FormText className="d-block fw-semibold text-black">
								{profile.phone ? profile.phone : `3456789017`}
								<span className="ms-1  fw-light">(Cellulare)</span>
							</FormText>
						</Form.Label>
					</Form.Group>
					<Form.Group className="mb-3 d-flex align-items-start" controlId="exampleForm.ControlInput3">
						<MdOutlineEmail className="ms-1 me-3 mt-1 fs-5" />
						<Form.Label className="fw-semibold">
							Email
							<FormText className="d-block text-primary fw-semibold">
								{profile.email ? profile.email : "Registra la tua email"}
							</FormText>
						</Form.Label>
					</Form.Group>
					<Form.Group className="mb-3 d-flex align-items-start" controlId="exampleForm.ControlInput4">
						<ImCalendar className="ms-1 me-3 mt-1 fs-5" />
						<Form.Label className="fw-semibold">
							Compleanno
							<FormText className="d-block fw-semibold">
								{profile.boarn ? profile.boarn : "Inserisci il tuo compleanno"}
							</FormText>
						</Form.Label>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default InfoModal;
