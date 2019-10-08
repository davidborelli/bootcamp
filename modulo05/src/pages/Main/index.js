import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import * as S from './styles';

Icon.loadFont();

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: '',
      users: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    try {
      const users = await AsyncStorage.getItem('users');

      if (users) {
        this.setState({ users: JSON.parse(users) });
      }
    } catch (error) {
      console.tron.log(error);
    }
  };

  componentDidUpdate = (_, prevState) => {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users)); // Converter para JSON, pois não suporta objeto
    }
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  static navigationOptions = {
    title: 'Usuários',
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <S.Container>
        <S.Form>
          <S.Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
            keyboardAppearance="dark"
            keyboardType="default"
          />
          <S.SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </S.SubmitButton>
        </S.Form>

        <S.List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <S.User>
              <S.Avatar source={{ uri: item.avatar }} />
              <S.Name>{item.name}</S.Name>
              <S.Bio>{item.bio}</S.Bio>

              <S.ProfileButton onPress={() => this.handleNavigate(item)}>
                <S.ProfileButtonText>Ver Perfil</S.ProfileButtonText>
              </S.ProfileButton>
            </S.User>
          )}
        />
      </S.Container>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
