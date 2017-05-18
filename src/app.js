import React, {Component} from 'react';
import {render} from 'react-dom';
import HowLongSince from './components/HowLongSince';

const app = (
	<HowLongSince/>
);

render(app, document.getElementById('app'));