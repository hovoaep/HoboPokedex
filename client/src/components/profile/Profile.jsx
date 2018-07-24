import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pokemon from "../pokemons/Pokemon";
import Spinner from "../common/Spinner";
import { bindActionCreators } from "redux";
import { setCurrentUser, updateUserInfo } from "../../actions/authActions";
// import { Link } from "react-router-dom";
import { Card, Icon, Modal } from "antd";
import TextFieldGroup from "../common/TextFieldGroup";

class Profile extends Component {
  state = {
    visible: false,
    name: "",
    oldPassword: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  openUserInfoModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    const updateUser = {
      name: this.state.name,
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.updateUserInfo(updateUser);
    if (this.state.errors) {
      this.setState({
        visible: false
      });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const PokemonCardList = this.props.profile.loading ? (
      <div>
        <Spinner />
      </div>
    ) : (
      this.props.profile.userData.likes.map((item, i) => {
        return (
          <Pokemon key={i} url={`https://pokeapi.co/api/v2/pokemon/${item}`} />
        );
      })
    );
    const { user } = this.props.auth;
    const { errors } = this.state;

    return (
      <div>
        <div>
          <h1>
            Hello dear {user.name}{" "}
            <Icon
              type="edit"
              onClick={this.openUserInfoModal}
              style={{ fontSize: 22, color: "#08c" }}
            />
          </h1>
        </div>
        <div>
          <h3>This is your likes</h3>
          <Card>{PokemonCardList}</Card>
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="New name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              placeholder="Old Password"
              name="oldPassword"
              type="password"
              value={this.state.oldPassword}
              onChange={this.onChange}
              error={errors.oldPassword}
            />
            <TextFieldGroup
              placeholder="New password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              placeholder="Confirm new password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentUser,
      updateUserInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
