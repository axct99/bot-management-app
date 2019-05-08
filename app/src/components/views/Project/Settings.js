import React, { Component } from 'react';

import EditProjectForm from './Settings/EditProjectForm';

import { setTitle } from '../../../helpers';

class Settings extends React.Component {
  componentDidMount() {
    setTitle('Настройка проекта');
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Настройка проекта</div>
        </div>
        <div className="app-main-view-content">
          <EditProjectForm />
        </div>
      </div>
    );
  }
}

export default Settings;
