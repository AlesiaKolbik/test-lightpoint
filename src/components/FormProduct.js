import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProduct as updateList, updateProduct as _updateProduct} from '../actions/productServices';
import {getID} from '../helper';
import PropTypes from "prop-types";

class FormProduct extends Component {
    state = {
        name: '',
        description: '',
        errors: {}
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
        if (!this.state.name || this.state.name.length < 2) {
            errors.name = 'Поле необходимо заполнить. Строка должна содержать более 2 символов'
        }
        if (!this.state.description || this.state.description.length < 2) {
            errors.description = 'Поле необходимо заполнить. Строка должна содержать более 2 символов';
        }
        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false;
        } else {
            this.setState({errors: {}});
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
                <h3 className='mt-3 mb-3'>Добавление товара в магазин</h3>
                <div className='col-6'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Название</label>
                            <input type="text" className="form-control"
                                   id="name"
                                   placeholder="Введите название"
                                   onChange={this.handleChange}
                                   value={this.state.name}/>
                            <small className='text-danger'>{this.state.errors.name}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Описание</label>
                            <input type="text"
                                   className="form-control"
                                   id="description"
                                   placeholder="Описание продукта"
                                   onChange={this.handleChange}
                                   value={this.state.description}
                            />
                            <small className='text-danger'>{this.state.errors.description}</small>
                        </div>
                        <button className="btn btn-primary btn-sm mr-2" onClick={this.handleSubmit}>Сохранить</button>
                        <button className="btn btn-outline-primary btn-sm" onClick={this.handleCancel}>Отмена</button>
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