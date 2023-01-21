import React from 'react';
import Header from '../components/header';

const withHeader = (WrappedComponent: React.FunctionComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <Header />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withHeader;
