const ModalYesNo = ({ text, onYes, onNo, num }) => {
	return (
		<div className={
			"modal flex flex-col flex-justify-center flex-align-center"
			+ (num ? " modal-2" : "")
		}>
			<div className="modal-body flex flex-col flex-justify-between">
				<h1>{text}</h1>
				<div className="flex flex-row flex-justify-between">
					<button onClick={onYes}>Yes</button>
					<button onClick={onNo}>No</button>
				</div>
			</div>
		</div>
	)
}

export default ModalYesNo;