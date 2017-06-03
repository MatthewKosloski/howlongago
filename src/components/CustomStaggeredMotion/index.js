import React from 'react';
import PropTypes from 'prop-types';
import { StaggeredMotion, spring } from 'react-motion';

const defaultProps = {
	component: 'div',
	isVisible: true,
	to: {
		opacity: 1
	},
	from: {
		opacity: 0
	},
	defaultStyles: {
		opacity: 0
	},
	interpolatedStyles: ({opacity}) => ({opacity}),
}

const propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.element
	]),
	className: PropTypes.string,
	childClassName: PropTypes.string,
	isVisible: PropTypes.bool,
	to: PropTypes.object,
	from: PropTypes.object,
	interpolatedStyles: PropTypes.func,
	defaultStyles: PropTypes.object
}

const CustomStaggeredMotion = ({ 
	children,
	component,
	className,
	childClassName,
	isVisible,
	to,
	from,
	interpolatedStyles,
	defaultStyles 
}) => {

	const _isObject = (something) => typeof something === 'object';

	// For each child, create an object and pass in props.defaultStyles
	const _defaultStyles = React.Children.map(children, (child) => defaultStyles);

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
					if(_isObject(to[key])) { // if a spring config is provided, use it
						const { val, stiffness, damping } = to[key];
						springedStyles[key] = spring(val, {stiffness, damping});
					} else {
						springedStyles[key] = spring(to[key]);
					}
				} else {
					if(_isObject(from[key])) {
						const { val, stiffness, damping } = from[key];
						springedStyles[key] = spring(val, {stiffness, damping});
					} else {
						springedStyles[key] = spring(from[key]);
					}
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
			<div className={className || ''}>
				{interpolatingStyles.map((styles, i) => {
					return React.createElement(
						component, 
						{ 
							key: i, 
							style: interpolatedStyles({...styles}),
							className: childClassName || '' 
						}, 
						children[i]
					);
				})}
			</div>
			}
		</StaggeredMotion>
	);
}

CustomStaggeredMotion.defaultProps = defaultProps;
CustomStaggeredMotion.propTypes = propTypes;

export default CustomStaggeredMotion;