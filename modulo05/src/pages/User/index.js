import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import * as S from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      loading: true,
      page: 1,
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    this.load();
  };

  load = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  loadMore = async () => {
    const { page } = this.state;

    const nextPage = page + 1;
    this.load(nextPage);
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.load);
  };

  handleNavigate = item => {
    const { navigation } = this.props;

    navigation.navigate('WebView', { item });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <S.Container>
        <S.Header>
          <S.Avatar source={{ uri: user.avatar }} />
          <S.Name>{user.name}</S.Name>
          <S.Bio>{user.bio}</S.Bio>
        </S.Header>
        {loading ? (
          <S.Loading />
        ) : (
          <S.Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <S.Starred onPress={() => this.handleNavigate(item)}>
                <S.OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <S.Info>
                  <S.Title>{item.name}</S.Title>
                  <S.Author>{item.owner.login}</S.Author>
                </S.Info>
              </S.Starred>
            )}
          />
        )}
      </S.Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
