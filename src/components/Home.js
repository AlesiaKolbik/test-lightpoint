import React from 'react';
import {Link} from 'react-router-dom';

export const Home = () => {
    return (
        <div className='container text-center'>
            <div className='m-5'>
                <h3>Добро пожаловать!</h3>
                <p>Это менеджер, для создания и управления магазинами.</p>
                <Link to='/shops' className="btn btn-primary btn-sm m-1">Перейти к
                    списку магазинов</Link>
            </div>
        </div>
    )
};