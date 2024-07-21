"use client"
import Link from 'next/link';
import React, { Component } from 'react';
import LoginForm from './LoginForm';

class Header extends Component {
    render() {
        return (
            <div className='log_reg_header'>
                <div className='container'>
                    <div className='inner'>
                        <div className='left'>
                            <a href="/" className='logo'>
                                <img src='/allies-dark-logo.png'/>
                            </a>
                        </div>
                        <div className='right'>
                            <LoginForm inline={true}/>
                            {
                                /**
                                 * <div className='btn_links'>
                                <Link className='rs_btn' href="/register">Register</Link>
                            </div>
                                 */
                            }
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Header;