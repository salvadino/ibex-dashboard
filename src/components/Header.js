import React from 'react';
import Fluxxor from 'fluxxor';
import '../styles/Header.css';
import logoURL from '../images/OCHA_Logo.png';
import {getEnvPropValue} from '../utils/Utils.js';

const FluxMixin = Fluxxor.FluxMixin(React),
      StoreWatchMixin = Fluxxor.StoreWatchMixin("DataStore");

export const Header = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin],
  
  getInitialState(){
    return {given_name: 'Erik'};  
  },
  
  getStateFromFlux() {
    return this.getFlux().store("DataStore").getState();
  },

  componentWillReceiveProps(nextProps) {
       this.setState(this.getStateFromFlux());
  },

  render() {
    var self = this;
    let siteKey = this.props.siteKey;
    let title = getEnvPropValue(siteKey, process.env.REACT_APP_SITE_TITLE);
    //let logoURL = getEnvPropValue(siteKey, process.env.REACT_APP_SITE_LOGO);
    let initials = 'N/A';

    return (
      <nav className="navbar navbar-trans" role="navigation">
          <div classNameName="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapsible">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand text-danger" href="#">
                      <img role="presentation" src={logoURL} style={{display: 'inline'}} width="45" height="45" />
                     <span className="brandLabel">{title}</span>
                  </a>
              </div>
              <div className="navbar-collapse collapse" id="navbar-collapsible">
                  <ul className="nav navbar-nav navbar-left">
                      <li>&nbsp;</li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                      <li className="userProfile">
                        <span className="userLabel">{self.state && self.state.given_name ? 'Hello ' + self.state.given_name : undefined}&nbsp;</span>
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-square fa-stack-2x"></i>
                          <i className="fa fa-stack-1x fa-inverse" style={{color: '#222931', fontWeight: '600', fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif'}}>
                            {initials}
                          </i>
                        </span>
                      </li>
                  </ul>
              </div>
          </div>
     </nav>
      );
  }
});
