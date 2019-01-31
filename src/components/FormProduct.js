import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProduct as updateList, updateProduct as _updateProduct} from '../actions/productServices';
import {getID} from '../helper';
import PropTypes from "prop-types";

class FormProduct extends Component {
    state = {
        name: '',
        description: '',
        errors: {},
        errorText: ''
    };

    componentDidMount() {
        const product = this.props.productToChange;
        if (product) {
            this.setState({
                name: product.name,
                description: product.description
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.checkFormValid()) {
            return false;
        }

        const product = {
            name: this.state.name,
            description: this.state.description,
            id: this.props.productToChange ? this.props.id : getID()
        };

        if (this.props.productToChange) {
            this.props.updateProduct(this.props.shopId, product);
        } else {
            this.props.addProduct(this.props.shopId, product);
        }

        this.handleCancel();
    };
    checkFormValid = () => {
        let errors = {};
        let errorText = 'This field is required. The string must contain more than 2 characters.';
        if (!this.state.name || this.state.name.length < 2) {
            errors.name = '*';
        }
        if (!this.state.description || this.state.description.length < 2) {
            errors.description = '*';
        }
        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors, errorText: errorText});
            return false;
        } else {
            this.setState({errors: {}, errorText: ''});
            return true;
        }
    };
    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };
    handleCancel = (e) => {
        this.props.hideForm();
    };

    render() {
        return (
            <div className="container">
                <h3 className='mt-3 mb-3'>{this.props.productToChange ? 'Edit product' : 'Add product'}</h3>
                {this.state.errorText && <small className='text-danger'>{this.state.errorText}</small>}
                <div className='col-6'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Title</label>
                            <span className='text-danger'>{this.state.errors.name}</span>
                            <input type="text"
                                   className={this.state.errors.name ? "form-control border-danger" : "form-control"}
                                   id="name"
                                   placeholder="Title product"
                                   onChange={this.handleChange}
                                   value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <span className='text-danger'>{this.state.errors.description}</span>
                            <input type="text"
                                   className={this.state.errors.description ? "form-control border-danger" : "form-control"}
                                   id="description"
                                   placeholder="Description product"
                                   onChange={this.handleChange}
                                   value={this.state.description}
                            />
                        </div>
                        <button className="btn btn-primary btn-sm mr-2" onClick={this.handleSubmit}>Save</button>
                        <button className="btn btn-outline-primary btn-sm" onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    addProduct: (id, obj) => dispatch(updateList(id, obj)),
    updateProduct: (shopId, obj) => dispatch(_updateProduct(shopId, obj))
});

FormProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    productToChange: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string
    })
};

export default connect(mapStateToProps,
    mapDispatchToProps
)(FormProduct)