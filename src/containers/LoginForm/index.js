import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, FormField, Button } from '../../components';
import { emailChanged } from '../../actions';

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
            />
          </CardSection>

          <CardSection>
            <FormField
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
            />
          </CardSection>

          <CardSection>
            <Button>
              Log in
            </Button>
          </CardSection>
        </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onEmailChange: email => dispatch(emailChanged(email))
});

export default connect(null, mapDispatchToProps)(LoginForm);
