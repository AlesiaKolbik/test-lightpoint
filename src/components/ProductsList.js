import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "./Product";
import FormProduct from "./FormProduct";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {findShop as _findShop} from '../actions/shopServices';
import {findProduct as _findProduct,
    cleanProductFilter as _cleanProductFilter} from '../actions/productServices';

class ProductsList extends Component {
    state = {
        shopId: null,
        form: false,
        productToChange: null,
        searchProduct: ''
    };

    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState({shopId: id});
        this.props.findShop(id);

    }

    handleShowForm = () => {
        this.setState({form: true});
    };
    handleHideForm = () => {
        this.setState({form: false, productToChange: null});
    };
    handleEditProduct = (product) => {
        console.log(product);
        this.setState({form: true, productToChange: product})
    };
    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };
    handleFindProduct = () => {
        this.props.findProduct(this.state.searchProduct.trim());
    };
    handleCleanFilter = () => {
        this.props.cleanProductFilter();
    };

    render() {
        const table =
            <div className="container">
                <div className='col-12'>
                    <h2>Products</h2>
                    <div className="input-group mb-3 col-6 float-right">
                        <input type="text" className="form-control bg-light" id='searchProduct'
                               value={this.state.searchProduct} onChange={this.handleChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit"
                                    onClick={this.handleFindProduct}>Search product
                            </button>
                        </div>
                        {this.props.filterProduct && <div className='col-12 mt-2'>
                            <div onClick={this.handleCleanFilter} className='filter-block'>
                                <span className='filter-item'>{this.props.filterProduct}</span>
                                <sup className='ml-1 cross'>&#128937;</sup></div></div>}
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Title</th>
                            <th scope="col" colSpan='2'>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.productsList[this.state.shopId] &&
                            this.props.productsList[this.state.shopId].filter(p => {
                                return p.name.includes(this.props.filterProduct)
                            }).map((p, i) => {
                                return <Product key={p.id} name={p.name} description={p.description} id={p.id}
                                                number={i + 1}
                                                editProduct={this.handleEditProduct}
                                                shopId={this.state.shopId}/>
                            })
                        }
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-primary m-2"
                            onClick={this.handleShowForm}>Add product
                    </button>
                    <Link to={`/shops`} className="btn btn-primary">Back to stores</Link>
                </div>
            </div>;
        const form = <FormProduct shopId={this.state.shopId}
                                  hideForm={this.handleHideForm}
                                  productToChange={this.state.productToChange}/>;
        if (!this.props.shop) {
            return (
                <div className='container text-center'>
                    <h2 className='m-5'>The store does not exist
                    </h2>
                    <Link to={`/shops`}>Back to stores</Link>
                </div>
            )
        }
        return (
            (this.state.form) ? form : table
        )
    }
}

const mapStateToProps = state => ({
    productsList: state.products,
    shop: state.shops.shopIsExists,
    filterProduct: state.filterProduct
});
const mapDispatchToProps = dispatch => ({
    findShop: id => dispatch(_findShop(id)),
    findProduct: name => dispatch(_findProduct(name)),
    cleanProductFilter: () => dispatch(_cleanProductFilter()),
});

ProductsList.propTypes = {
    productsList: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string,
    }),
    findShop: PropTypes.func.isRequired,
    shopIsExist: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsList)