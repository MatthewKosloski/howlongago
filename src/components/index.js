import React from 'react';

const FirstChild = (props) => {
	const childrenArray = React.Children.toArray(props.children);
	return childrenArray[0] || null;
}

export default FirstChild;