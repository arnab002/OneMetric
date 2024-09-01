'use client';
import React from 'react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { X } from 'react-feather';
import UserAccount from '../userAccount/page';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const CustomSidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <Sidebar
      collapsed={!sidebarOpen}
      width="100%"
      collapsedWidth="0px"
      transitionDuration={300}
      style={{
        height: '100vh',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div>
        <button
          type="button"
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            top: '12px',
            zIndex: 99,
            right: '85%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
          }}
        >
          <X size={24} color="#fff" /> {/* X icon */}
        </button>
        <Menu>
          <UserAccount />
        </Menu>
      </div>
    </Sidebar>
  );
};

export default CustomSidebar;
