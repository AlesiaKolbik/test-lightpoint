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
        errors: {}
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
        if (!this.state.name || this.state.name.length < 2) {
            errors.name = 'Поле необходимо заполнить. Строка должна содержать более 2 символов'
        }
        if (!this.state.address || this.state.address.length < 5) {
            errors.address = 'Поле необходимо заполнить. Строка должна содержать более 5 символов';
        }
        if (!this.state.mode || this.state.mode.length < 5) {
            errors.mode = 'Поле необходимо заполнить. Строка должна содержать более 5 символов'
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
            <div className='col-6'>
                <h3 className='mt-3 mb-3'>Создание магазина</h3>
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
                        <label htmlFor="address">Адрес</label>
                        <input type="text"
                               className="form-control"
                               id="address"
                               placeholder="Введите адрес"
                               onChange={this.handleChange}
                               value={this.state.address}
                        />
                        <small className='text-danger'>{this.state.errors.address}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mode">Режим работы</label>
                        <input type="text"
                               className="form-control"
                               id="mode"
                               placeholder="Введите режим работы магазина"
                               onChange={this.handleChange}
                               value={this.state.mode}
                        />
                        <small className='text-danger'>{this.state.errors.mode}</small>
                    </div>
                    <button className="btn btn-primary btn-sm mr-2" onClick={this.handleSubmit}>Сохранить</button>
                    <button className="btn btn-outline-primary btn-sm" onClick={this.handleCancel}>Отмена</button>
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