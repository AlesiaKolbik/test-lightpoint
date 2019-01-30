import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

export default class Shop extends Component {

    handleEdit = () => {
        const shop = {
            number: this.props.number,
            name: this.props.name,
            address: this.props.address,
            mode: this.props.mode,
            id: this.props.id
        };
        this.props.editShop(shop);
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.props.number}</th>
                <td>{this.props.name}</td>
                <td>{this.props.address}</td>
                <td>{this.props.mode}</td>
                <td>
                    <button type="button" className="btn btn-secondary btn-sm"
                            onClick={this.handleEdit}>Редактировать
                    </button>
                    <Link to={`/shops/${this.props.id}`} className="btn btn-primary btn-sm m-1">Перейти к
                        товарам</Link>
                </td>
            </tr>

        )
    }
}

Shop.propTypes = {
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    editShop: PropTypes.func.isRequired
};