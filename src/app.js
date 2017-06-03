import React, {Component} from 'react';
import {render} from 'react-dom';
import HowLongAgo from './components/HowLongAgo';

const app = (
	<HowLongAgo/>
);

render(app, document.getElementById('app'));