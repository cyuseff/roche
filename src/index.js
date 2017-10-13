import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Layout from './components/Layout';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Layout);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/Layout', () => render(Layout));
}
