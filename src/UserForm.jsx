function UserForm({
	inputConfigList = [],
	onSubmitText = "Submit",
	onSubmit = Function.prototype,
	onResetText = "Reset",
	onReset = Function.prototype,
	children
}) {
	return (
		<div className="form-wrapper flex flex-justify-center flex-align-center mt-50">
			<form
				method="PATCH"
				action="https://jsonplaceholder.typicode.com/users/1"
				onSubmit={onSubmit} onReset={onReset} className="form flex flex-col flex-justify-between pt-20 pl-20 pr-20 pb-20"
			>
				<div className="form-container flex flex-col flex-justify-start">
					{
						inputConfigList.map((inputConfig, i) => {
							return (
								<div
									key={inputConfig.name}
									className={"flex flex-row flex-justify-center flex-align-center mt-10 form-row"}
								>
									<label className="flex-equal flex flex-row flex-justify-between flex-align-center">
										<span >{inputConfig.text}</span>
										<input
											type={inputConfig.type}
											name={inputConfig.name}
											value={inputConfig.value}
											defaultValue={inputConfig.defaultValue}
											defaultChecked={inputConfig.defaultChecked}
											{...inputConfig.handlers}
										/>
									</label>
								</div>
							);
						})
					}
				</div>
				<div className="form-row-buttons flex flex-justify-around mt-50">
					<input type="submit" name="submit" value={onSubmitText} />
					<input type="reset" name="reset" value={onResetText} />
				</div>
			</form>
			{children}
		</div>
	);
}

export default UserForm;
