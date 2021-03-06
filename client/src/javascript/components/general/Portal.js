import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import * as i18n from '../../i18n/languages';
import SettingsStore from '../../stores/SettingsStore';

class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: <div />,
  };

  componentDidMount() {
    this.nodeEl = document.createElement('div');
    document.body.appendChild(this.nodeEl);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.nodeEl);
    document.body.removeChild(this.nodeEl);
  }

  render() {
    const locale = SettingsStore.getFloodSettings('language');
    if (this.nodeEl == null) return null;
    return ReactDOM.createPortal(
      // eslint-disable-next-line import/namespace
      <IntlProvider locale={locale} messages={i18n[locale]}>
        {this.props.children}
      </IntlProvider>,
      this.nodeEl,
    );
  }
}

export default Portal;
