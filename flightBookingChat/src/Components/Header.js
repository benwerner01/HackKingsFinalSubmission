import React, { Component } from 'react';
import { AgentBar, Avatar, Column, Title, Subtitle } from '@livechat/ui-kit'

class Header extends Component {

    render() {
    return (
        <div className='Header'>
        <div style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            height: '100px',
            background: 'linear-gradient(to right bottom, #5b9aff, #66c9ff)'
        }}>
            <img
                src='https://www.iconsdb.com/icons/preview/white/airplane-57-xxl.png'
                alt='Logo'
                style={{
                    width: '80px',
                    padding: '10px',
                    margin: 'auto',
            }}
            />
        </div>
        
        </div>       
    );
  }
}

export default Header;