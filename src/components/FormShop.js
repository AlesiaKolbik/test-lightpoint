import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addShop as updateList, updateShop as _updateShop} from '../actions/shopServices';
import {getID} from '../helper';
import PropTypes from "prop-types";

class FormShop extends Component {
    state = {
        name: '',
        address: '',
        mode: '',
        errors: {},
        errorText:null
    };

    componentDidMount() {
        const shop = this.props.shopToChange;
        if (shop) {
            this.setState({
                name: shop.name,
                address: shop.address,
                mode: shop.mode
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.checkFormValid()) {
            return false;
        }

        const shop = {
            name: this.state.name,
            address: this.state.address,
            mode: this.state.mode,
            number: this.props.shopToChange ? this.props.shopToChange.number : this.props.shopNumber + 1,
            id: this.props.shopToChange ? this.props.shopToChange.id : getID()
        };
        if (this.props.shopToChange) {
            this.props.updateShop(shop);
        } else {
            this.props.addShop(shop);
        }
        this.handleCancel();
    };
    checkFormValid = () => {
        let errors = {};
        let errorText = 'This field is required. The string must contain more than 2 characters.';
        if (!this.state.name || this.state.name.length < 2) {
            errors.name = '*';
        }
        if (!this.state.address || this.state.address.length < 2) {
            errors.address = '*';
        }
        if (!this.state.mode || this.state.mode.length < 2) {
            errors.mode = '*';
        }
        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors, errorText:errorText});
            return false;
        } else {
            this.setState({errors: {}, errorText:null});
            return true;
        }
    };
    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };
    handleCancel = () => {
        this.props.hideForm();
    };

    render() {
        return (
            <div className='col-6'>
                <h3 className='mt-3 mb-3'>{this.props.shopToChange ? 'Edit shop' : 'Add shop'}</h3>
                {this.state.errorText && <small className='text-danger'>{this.state.errorText}</small>}
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <span className='text-danger'>{this.state.errors.name}</span>
                        <input type="text"
                               className={this.state.errors.name ? "form-control border-danger" : "form-control"}
                               id="name"
                               placeholder="Name of shop"
                               onChange={this.handleChange}
                               value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <span className='text-danger'>{this.state.errors.address}</span>
                        <input type="text"
                               className={this.state.errors.address ?"form-control border-danger" : "form-control"}
                               id="address"
                               placeholder="Address shop"
                               onChange={this.handleChange}
                               value={this.state.address}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mode">Shop mode</label>
                        <span className='text-danger'>{this.state.errors.mode}</span>
                        <input type="text"
                               className={this.state.errors.mode ?"form-control border-danger" : "form-control"}
                               id="mode"
                               placeholder="Shop mode"
                               onChange={this.handleChange}
                               value={this.state.mode}
                        />
                    </div>
                    <button className="btn btn-primary btn-sm mr-2" type="button"
                            onClick={this.handleSubmit}>Save</button>
                    <button className="btn btn-outline-primary btn-sm" type="button"
                            onClick={this.handleCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    addShop: obj => dispatch(updateList(obj)),
    updateShop: obj => dispatch(_updateShop(obj))
});

FormShop.propTypes = {
    addShop: PropTypes.func.isRequired,
    updateShop: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    shopNumber: PropTypes.number.isRequired,
    shopToChange: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        mode: PropTypes.string,
        id: PropTypes.string,
    })
};

export default connect(mapStateToProps,
    mapDispatchToProps
)(FormShop)