import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

(w => {
  ReactDOM.render(
    React.createElement(App, {}),
    document.getElementById('root')
  );
})(window);
