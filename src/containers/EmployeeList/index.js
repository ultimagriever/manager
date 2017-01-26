import React, { Component } from 'react';
import { ListView } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { employeesFetch } from '../../actions';
import { ListItem } from '../../components';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.onLoad();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource(props) {
    const { employees } = props;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    console.log(this.props.employees);
    return (
        <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
        />
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, id) => ({ ...val, id }));

  return {
    employees
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(employeesFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
