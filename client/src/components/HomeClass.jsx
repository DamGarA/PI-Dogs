// import React, { Component } from "react"
// import { connect } from 'react-redux'

// class Home extends Component {
// constructor (props) {
//     super (props);
// this.state = {
//  estado: true;
// estado2: false   
//}
// }

// handleClick1() {
//     this.setState({
//       example1: 'new value 1'
//     });
//   };

//   handleClick2() {
//     this.setState(prevState => ({
//       example2: prevState.example2 + ' updated'
//     }));
//   };

// componentDidMount() {
//     const { myFavorites } = this.props
    
// }

// render() {
//     <>
//     </>
// }

// }

// const mapStateToProps = (state) => {
//     return {
//        myFavorites: state.myFavorites,
//     }
//  }
 
//  const mapDispatchToProps = (dispatch) => {
//     return {
//        addCharact: (character) => dispatch(addCharacter(character)),
//        deleteCharact: (name) => dispatch(deleteCharacter(name)),
//     }
//  }
 
//  export default connect(mapStateToProps, mapDispatchToProps)(Home)