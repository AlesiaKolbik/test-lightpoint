import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateShopsList as _updateShopsList} from "../actions/shopServices";

class Shop extends Component {
    state = {
        items: null
    };

    componentDidMount() {
        this.setState({items: this.props.shopsList});

    }

    handleEdit = (e) => {
        const shop = this.props.shopsList.find(s => {
            return s.id === e.target.id
        });

        this.props.editShop(shop);
    };

    onDragStart = (e, index) => {
        this.draggedItem = this.state.items[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = (index) => {
        const draggedOverItem = this.state.items[index];
        if (this.draggedItem === draggedOverItem) {
            return;
        }
        let items = this.state.items.filter(item => item !== this.draggedItem);

        draggedOverItem.number = this.draggedItem.number;
        this.draggedItem.number = index + 1;
        items.splice(index, 0, this.draggedItem);
        this.setState({items});
        this.props.updateShopsList(items);
    };
    onDragEnd = () => {
        this.draggedIdx = null;
    };

    render() {
        return (<div>
                <h2>Магазины</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Название</th>
                        <th scope="col">Адрес</th>
                        <th scope="col" colSpan='2'>Режим работы</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.shopsList.map((s, i) => (
                        <tr onDragOver={() => this.onDragOver(i)} key={s.id}>
                            <th scope="row" draggable='true' className='drag'
                                onDragStart={e => this.onDragStart(e, i)} onDragEnd={this.onDragEnd}>
                                {s.number}</th>
                            <td>{s.name}</td>
                            <td>{s.address}</td>
                            <td>{s.mode}</td>
                            <td>
                                <button type="button" className="btn btn-secondary btn-sm" id={s.id}
                                        onClick={this.handleEdit}>Редактировать
                                </button>
                                <Link to={`/shops/${s.id}`} className="btn btn-primary btn-sm m-1">Перейти к
                                    товарам</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

Shop.propTypes = {
    shopsList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            address: PropTypes.string,
            mode: PropTypes.string,
            id: PropTypes.string
        })),
};

const mapStateToProps = state => ({
    shopsList: state.shops.list
});

const mapDispatchToProps = dispatch => ({
    updateShopsList: list => dispatch(_updateShopsList(list))
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Shop)