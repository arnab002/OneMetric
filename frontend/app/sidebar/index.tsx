'use client';
import React from 'react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { X } from 'react-feather';
import UserAccount from '../userAccount';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const CustomSidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
            zIndex: 999, // ensure it's behind the sidebar but above other content
          }}
        />
      )}

      <Sidebar
        collapsed={!sidebarOpen}
        width="100%" // Give a defined width to the sidebar
        collapsedWidth="0px"
        transitionDuration={300}
        style={{
          height: '100%',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 1000, // Ensure the sidebar is above the overlay and other content
          backgroundColor: '#333', // Sidebar background color
          color: '#fff', // Text color
        }}
      >
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              zIndex: 1001, // Ensure button stays above the sidebar content
            }}
          >
            <X size={24} color="#fff" /> {/* X icon */}
          </button>
          <Menu>
            <UserAccount />
          </Menu>
        </div>
      </Sidebar>
    </>
  );
};

export default CustomSidebar;
