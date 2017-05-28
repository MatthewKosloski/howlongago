import React from 'react';

const FirstChild = ({children}) => {
	const childrenArray = React.Children.toArray(children);
	return childrenArray[0] || null;
}

export default FirstChild;