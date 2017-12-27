import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.css';

import Sudoku from './containers/Sudoku/Sudoku';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<Sudoku />, document.getElementById('root'));

registerServiceWorker();
