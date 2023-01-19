import { useFieldArray } from "react-hook-form";
import { useState } from "react";
import { NestedInputs } from "./dataInputs";

export const DataFields = ({ control, register, errors, modalInputFields }) => {
	const {
		fields: dataFields,
		append: dataAppend,
		remove: dataRemove,
	} = useFieldArray({
		name: "Data",
		control,
	});

	const [DataTypesArray, setDataTypes] = useState([]);

	return (
		<div>
			{dataFields.map((field, index) => {
				return (
					<div key={field.id}>
						<label>Data type</label>
						<select
							{...register(`Data.${index}.type`, {
								required: "Data type is required",
							})}
							onClick={(val) =>
								setDataTypes((prev) => ({
									...prev,
									[index]: val.target.value,
								}))
							}
						>
							<option value="view">View Function</option>
						</select>
						<button onClick={() => dataRemove(index)}>X</button>
						<p>{errors.Data?.[index]?.type?.message}</p>

						{DataTypesArray[index] === "view" && (
							<div>
								<div>
									<label>Function Name</label>
									<input
										{...register(`Data.${index}.name`, {
											required: "Function Name is required",
											maxLength: {
												value: 100,
												message: "Maximum function name length is 100",
											},
										})}
									/>
									<p>{errors.Data?.[index]?.name?.message}</p>
								</div>
								<div>
									<label>Address</label>
									<input
										{...register(`Data.${index}.address`, {
											required: "Address is required",
											maxLength: {
												value: 42,
												message: "Maximum address length is 42",
											},
										})}
									/>
									<p>{errors.Data?.[index]?.address?.message}</p>
								</div>
								<div>
									<label>Blockchain</label>
									<select
										{...register(`Data.${index}.blockchain`, {
											required: "Blockchain is required",
										})}
									>
										<option value="goerli">Goerli</option>
									</select>
								</div>
								<div>
									<label>ABI</label>
									<input
										{...register(`Data.${index}.ABI`, {
											required: "ABI is required",
											maxLength: {
												value: 10000,
												message: "Maximum ABI length is 10000",
											},
										})}
									/>
									<p>{errors.Data?.[index]?.ABI?.message}</p>
								</div>
								<NestedInputs
									nestIndex={index}
									{...{ control, register, errors }}
								/>
								<p>
									Output:{" "}
									{String.fromCharCode(65 + modalInputFields.length + index)}
								</p>
							</div>
						)}
					</div>
				);
			})}
			{dataFields.length < 10 && (
				<button
					onClick={() =>
						dataAppend({
							type: "",
						})
					}
				>
					+ Data
				</button>
			)}
		</div>
	);
};
