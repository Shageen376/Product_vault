import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {

    const params = useParams();
    const navigate = useNavigate();
    const [initialDate, setInitialDate] = useState()
    const [errors, setErrors] = useState({});

    function getProduct() {
        fetch("http://localhost:4000/products/" + params.id)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error()
            })
            .then(data => {
                setInitialDate(data)
            })
            .catch(error => {
                alert("Unable to read the product details")
            })
    }
    useEffect(getProduct,[])
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
            const response = await fetch(`http://localhost:4000/products/${params.id}`, {
                method: "PATCH",
                body: formData
            });
            if (response.ok) {
                navigate("/admin/products");
            } else if (response.status === 400) {
                alert("Validation errors");
            } else {
                alert("Unable to update the product!");
            }
        } catch (err) {
            alert("Unable to connect to the server!");
        }
    }

    return (
        <div className='container my-4'>
            <div className='row'>
                <div className='col-md-8 mx-auto rounded border p-4'>
                    <h2 className='text-center mb-5'>Edit Product</h2>

                    <div className='row mb-3'>
                        <label className='col-sm-4 col-form-label'>ID</label>
                        <div className='col-sm-8'>
                            <input readOnly className='form-control-plaintext' defaultValue={params.id} />
                        </div>
                    </div>
                    {
                        initialDate &&
                        <form onSubmit={handleSubmit}>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Name</label>
                                <div className='col-sm-8'>
                                    <input className='form-control' name='name' defaultValue={initialDate.name} />
                                    <span className='text-danger'>{errors.name}</span>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Brand</label>
                                <div className='col-sm-8'>
                                    <input className='form-control' name='brand' defaultValue={initialDate.brand} />
                                    <span className='text-danger'>{errors.brand}</span>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Category</label>
                                <div className='col-sm-8'>
                                    <select className='form-select' name='category' defaultValue={initialDate.category}>
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
                                    <input className='form-control' name='price' type='number' step='0.01' min="1"
                                     defaultValue={initialDate.price}/>
                                    <span className='text-danger'>{errors.price}</span>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Description</label>
                                <div className='col-sm-8'>
                                    <textarea className='form-control' name='description' rows='4' defaultValue={initialDate.description}/>
                                    <span className='text-danger'>{errors.description}</span>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='offset-sm-4 col-sm-8'>
                                    <img src={"http://localhost:4000/images/" + initialDate.imageFilename} width="150" alt='...' />
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Image</label>
                                <div className='col-sm-8'>
                                    <input className='form-control' type='file' name='image' />
                                    <span className='text-danger'>{errors.image}</span>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Created At</label>
                                <div className='col-sm-8'>
                                    <input readOnly className='form-control-plaintext' defaultValue={initialDate.createdAt.slice(0, 10)} />
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
                    }
                </div>
            </div>
        </div>
    );
}
