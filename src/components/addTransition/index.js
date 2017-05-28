import React from 'react';

const addTransition = (Component) => {
	const defaultProps = {
		transitionDuration: 0.3,
		transitionDelay: 0,
		classNameBefore: '',
		classNameAfter: '',
	};

	class AddTransition extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				className: props.classNameBefore
			}
		}

		componentDidMount() {
			if(this.props.isTransitionActive) {
				this.setState({
					className: this.props.classNameAfter
				});
			} else {
				this.setState({
					className: this.props.classNameBefore
				});
			}
		}

		render() {
			return <Component className={this.state.className} {...this.props}/>;
		}
	}

	AddTransition.defaultProps = defaultProps;

	return AddTransition;
}

export default addTransition;