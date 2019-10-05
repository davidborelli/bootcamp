import 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import * as S from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: '',
      users: [],
    };
  }

  handleAddUSer = async () => {
    const { users, newUser } = this.state;

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
    });

    Keyboard.dismiss();
  };

  render() {
    const { users, newUser } = this.state;
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
            onSubmitEditing={this.handleAddUSer}
            keyboardAppearance="dark"
            keyboardType="default"
          />
          <S.SubmitButton onPress={this.handleAddUSer}>
            <Icon name="add" size={20} color="#fff" />
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

              <S.ProfileButton onPress={() => {}}>
                <S.ProfileButtonText>Ver Perfil</S.ProfileButtonText>
              </S.ProfileButton>
            </S.User>
          )}
        />
      </S.Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
