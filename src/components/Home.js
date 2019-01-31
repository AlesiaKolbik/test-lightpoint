import React from 'react';
import {Link} from 'react-router-dom';

export const Home = () => {
    return (
        <div className='container text-center'>
            <div className='m-5'>
                <h3>Welcome!</h3>
                <p>This is a manager for creating and managing stores.</p>
                <Link to='/shops' className="btn btn-primary btn-sm m-1">Go to shops</Link>
            </div>
        </div>
    )
};