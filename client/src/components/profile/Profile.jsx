import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pokemon from "../pokemons/Pokemon";
import Spinner from "../common/Spinner";
import { bindActionCreators } from "redux";
import { setCurrentUser } from "../../actions/authActions";
// import { Link } from "react-router-dom";
import { Card, Icon, Modal, Input } from "antd";

class Profile extends Component {
  state = { visible: false };

  openUserInfoModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
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
          <Input addonAfter="Enyer your name" value={user.name} />
          <Input addonAfter="Old passowrd" />
          <Input addonAfter="New Password" />
          <Input addonAfter="Renter your password" />
        </Modal>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
