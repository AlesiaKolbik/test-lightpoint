import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormShop from "./FormShop";
import Shop from "./Shop";
import PropTypes from 'prop-types';

class ShopsList extends Component {
    state = {
        form: false,
        shopToChange: null,
        numberShops: 0
    };

    handleHideForm = () => {
        this.setState({form: false, shopToChange: null});
    };
    handleShowForm = () => {
        this.setState({form: true});
    };
    handleEditShop = (shop) => {
        this.setState({form: true, shopToChange: shop})
    };

    componentDidMount() {
        const numberShops = this.props.shopsList.length;
        this.setState({numberShops: numberShops})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const numberShops = nextProps.shopsList.length;
        this.setState({numberShops: numberShops})
    }

    render() {
        const list = this.props.shopsList.map((s, i) => {
            return <Shop key={s.id} name={s.name}
                         address={s.address}
                         mode={s.mode}
                         id={s.id}
                         number={s.number}
                         editShop={this.handleEditShop}
            />
        });
        return (
            <div className="container">
                <div className='row'>

                    {this.state.form ?
                        <FormShop hideForm={this.handleHideForm} shopToChange={this.state.shopToChange}
                                  shopNumber={this.state.numberShops}/>
                        :
                        <div className='col-12'>
                            <h2>Магазины</h2>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Название</th>
                                    <th scope="col">Адрес</th>
                                    <th scope="col">Режим работы</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list}
                                </tbody>
                            </table>
                            <div className="w-100"></div>
                            <button type="button" className="btn btn-primary m-2"
                                    onClick={this.handleShowForm}>Добавить магазин
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    shopsList: state.shops.list
});

ShopsList.propTypes = {
    shopsList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            address: PropTypes.string,
            mode: PropTypes.string,
            id: PropTypes.string
        })),
};


export default connect(
    mapStateToProps
)(ShopsList)