import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

const ModalYesNoPortal = ({ text, onYes, onNo, num }) => {
	
	const element = useMemo(() => {
		const classes = "modal flex flex-col flex-justify-center flex-align-center" + (num ? " modal-2" : "")
		const div = document.createElement("div")
		div.className = classes;
		return div
	}, [text, num]);

	useEffect(() => {
		let modalRootElement = document.querySelector("#modal-root");
		if (!modalRootElement) {
			modalRootElement = document.createElement("div");
			modalRootElement.id = "modal-root";
			document.body.appendChild(modalRootElement);
		}
		modalRootElement.appendChild(element);
		return () => {
			if (modalRootElement) {
				modalRootElement.removeChild(element);
				if (modalRootElement.children.length === 0) {
					document.body.removeChild(modalRootElement);
				}
			}
		};
	}, [element]);
	
	return createPortal(
		<div className="modal-body flex flex-col flex-justify-between">
			<h1>{text}</h1>
			<div className="flex flex-row flex-justify-between">
				<button onClick={onYes}>Yes</button>
				<button onClick={onNo}>No</button>
			</div>
		</div>,
		element
	)
}

export default ModalYesNoPortal;