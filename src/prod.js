import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';

(w => {
  ReactDOM.render(
    React.createElement(Layout, {}),
    document.getElementById('root')
  );
})(window);
