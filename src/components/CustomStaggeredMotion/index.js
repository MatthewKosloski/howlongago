import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { StaggeredMotion, spring } from 'react-motion';

const propTypes = {
	isVisible: PropTypes.bool.isRequired,
	to: PropTypes.object.isRequired,
	from: PropTypes.object.isRequired,
	interpolatedStyles: PropTypes.func.isRequired,
	defaultStyles: PropTypes.object.isRequired
}

const CustomStaggeredMotion = ({ children, isVisible, to, from, interpolatedStyles, defaultStyles }) => {

	const _isObject = (something) => typeof something === 'object';

	// For each child, create an object and pass in props.defaultStyles
	const _defaultStyles = Children.map(children, (child) => defaultStyles);

	// returns an array containing destination styles defined in props.to
	const _styles = (prevInterpolatedStyles) => {
		return prevInterpolatedStyles.map((_, i) => _springedStyles(prevInterpolatedStyles, i));
	}

	// returns an object containing styles that have been sprung
	const _springedStyles = (prevInterpolatedStyles, index) => {
		const springedStyles = {};

		Object.keys(to).map((key) => {
			if(index === 0) {
				if(isVisible) {
					/*
						if the current key in props.to is an object (e.g., spring(1, {stiffness: 150, damping: 15})),
						use it, else simply spring the provided integer
					*/
					springedStyles[key] = _isObject(to[key]) 
					? spring(to[key].val, {stiffness: to[key].stiffness, damping: to[key].damping})
					: spring(to[key]);
				} else {
					springedStyles[key] = _isObject(from[key]) 
					? spring(from[key].val, {stiffness: from[key].stiffness, damping: from[key].damping})
					: spring(from[key]);
				}
			} else {
				springedStyles[key] = spring(prevInterpolatedStyles[index - 1][key]);
			}
		});

		return springedStyles;
	}

	return(
		<StaggeredMotion
			defaultStyles={_defaultStyles}
			styles={_styles}>
			{interpolatingStyles =>
			<div>
				{interpolatingStyles.map((styles, i) =>
					<div key={i} style={interpolatedStyles({...styles})}>
						{children[i]}
					</div>
				)}
			</div>
			}
		</StaggeredMotion>
	);
}

CustomStaggeredMotion.propTypes = propTypes;

export default CustomStaggeredMotion;