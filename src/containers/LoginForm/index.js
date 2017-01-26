import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, FormField, Button, Spinner } from '../../components';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import styles from './styles';

class LoginForm extends Component {

  render() {
    return (
        <Card>
          <CardSection>
            <FormField
                label="Email"
                placeholder="e.g. user@example.com"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.props.onEmailChange}
                value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <FormField
                label="Password"
                placeholder="Enter your password"
                onChangeText={this.props.onPasswordChange}
                value={this.props.password}
                secureTextEntry
            />
          </CardSection>
          {
              this.props.error ? (
                  <CardSection>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.error}>{this.props.error}</Text>
                    </View>
                  </CardSection>
              ) : null
          }

          <CardSection>
            {
              this.props.loading ? (
                  <View style={{ flex: 1 }}>
                    <Spinner color="black" />
                  </View>
              ) : (

                  <Button onPress={() => this.props.onSubmit(this.props)}>
                    Log in
                  </Button>
              )
            }
          </CardSection>
        </Card>
    );
  }
}

const mapStateToProps = state => state.auth;

const mapDispatchToProps = dispatch => ({
  onEmailChange: email => dispatch(emailChanged(email)),
  onPasswordChange: password => dispatch(passwordChanged(password)),
  onSubmit: credentials => dispatch(loginUser(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
