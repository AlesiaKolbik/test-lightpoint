import React, {Component} from 'react';
import {addProduct as _addProduct, deleteProduct as _deleteProduct} from "../actions/productServices";
import {connect} from "react-redux";
import PropTypes from "prop-types";


class Product extends Component {

    handleDelete = () => {
        this.props.deleteProduct(this.props.shopId, this.props.id);
    };

    handleEdit = () => {
        const product = {
            name: this.props.name,
            description: this.props.description,
            id: this.props.id
        };
        this.props.editProduct(product);
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.props.number}</th>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>
                    <button type="button" className="btn btn-secondary btn-sm m-1"
                            onClick={this.handleDelete}>Удалить
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm"
                            onClick={this.handleEdit}>Редактировать
                    </button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    addProduct: (id, obj) => dispatch(_addProduct(id, obj)),
    deleteProduct: (shopId, productId) => dispatch(_deleteProduct(shopId, productId))
});

Product.propTypes = {
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    editProduct: PropTypes.func.isRequired
};

export default connect(mapStateToProps,
    mapDispatchToProps
)(Product)