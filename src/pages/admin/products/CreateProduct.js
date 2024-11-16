import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateProduct() {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	
	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const product = Object.fromEntries(formData.entries());
		
		// Perform validation
		let currentErrors = {};
		if (!product.name) currentErrors.name = "Name is required";
		if (!product.brand) currentErrors.brand = "Brand is required";
		if (!product.category) currentErrors.category = "Category is required";
		if (!product.price || product.price <= 0) currentErrors.price = "Enter a valid price";
		if (!product.description || product.description.length < 10) currentErrors.description = "Description must be at least 10 characters";
		if (!formData.get('image')) currentErrors.image = "Image is required";

		if (Object.keys(currentErrors).length > 0) {
			setErrors(currentErrors);
			return;
		}

		try {
			const response = await fetch("http://localhost:4000/products", {
				method: "POST",
				body: formData
			});
			if (response.ok) {
				navigate("/admin/products");
			} else if (response.status === 400) {
				alert("Validation errors");
			} else {
				alert("Unable to create the product!");
			}
		} catch (err) {
			alert("Unable to connect to the server!");
		}
	}

	function handleChange(event) {
		const { name, value, files } = event.target;
		let newErrors = { ...errors };

		if (name === "name" && value) delete newErrors.name;
		if (name === "brand" && value) delete newErrors.brand;
		if (name === "category" && value) delete newErrors.category;
		if (name === "price" && value > 0) delete newErrors.price;
		if (name === "description" && value.length >= 10) delete newErrors.description;
		if (name === "image" && files[0]) delete newErrors.image;

		setErrors(newErrors);
	}

	return (
		<div className='container my-4'>
			<div className='row'>
				<div className='col-md-8 mx-auto rounded border p-4'>
					<h2 className='text-center mb-5'>Create Product</h2>

					<form onSubmit={handleSubmit}>
						<div className='row mb-3'>
							<label className='col-sm-4 col-form-label'>Name</label>
							<div className='col-sm-8'>
								<input className='form-control' name='name' onChange={handleChange} />
								<span className='text-danger'>{errors.name}</span>
							</div>
						</div>
						<div className='row mb-3'>
							<label className='col-sm-4 col-form-label'>Brand</label>
							<div className='col-sm-8'>
								<input className='form-control' name='brand' onChange={handleChange} />
								<span className='text-danger'>{errors.brand}</span>
							</div>
						</div>
						<div className='row mb-3'>
							<label className='col-sm-4 col-form-label'>Category</label>
							<div className='col-sm-8'>
								<select className='form-select' name='category' onChange={handleChange}>
									<option value=''>Select a category</option>
									<option value='Phones'>Phones</option>
									<option value='Computers'>Computers</option>
									<option value='Accessories'>Accessories</option>
									<option value='Printers'>Printers</option>
									<option value='Cameras'>Cameras</option>
								</select>
								<span className='text-danger'>{errors.category}</span>
							</div>
						</div>
						<div className='row mb-3'>
							<label className='col-sm-4 col-form-label'>Price</label>
							<div className='col-sm-8'>
								<input className='form-control' name='price' type='number' step='0.01' min="1" onChange={handleChange} />
								<span className='text-danger'>{errors.price}</span>
							</div>
						</div>
						<div className='row mb-3'>
							<label className='col-sm-4 col-form-label'>Description</label>
							<div className='col-sm-8'>
								<textarea className='form-control' name='description' rows='4' onChange={handleChange} />
								<span className='text-danger'>{errors.description}</span>
							</div>
						</div>

						<div className='row mb-3'>
							<label className='col-sm-4 col-form-label'>Image</label>
							<div className='col-sm-8'>
								<input className='form-control' type='file' name='image' onChange={handleChange} />
								<span className='text-danger'>{errors.image}</span>
							</div>
						</div>
						<div className='row'>
							<div className='offset-sm-4 col-sm-4 d-grid'>
								<button type='submit' className='btn btn-primary'>Submit</button>
							</div>
							<div className='col-sm-4 d-grid'>
								<Link className='btn btn-secondary' to='/admin/products' role="button">Cancel</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
