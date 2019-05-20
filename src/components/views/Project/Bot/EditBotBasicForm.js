import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Select, List } from 'antd';

import config from '../../../../config';

class EditBotBasicForm extends React.Component {
  state = {
    sending: false
  }
  showSending() {
    this.setState({ sending: true });
  }
  hideSending() {
    setTimeout(() => {
      this.setState({ sending: false });
    }, 500);
  }
  async send(data) {
    this.showSending();
    axios.patch(
      config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
        project: {
          'bot.name': data.name,
          'bot.initialMessage': data.initialMessage
        }
      })
      .then((res) => {
        if (res.data.project) {
          Modal.success({
            title: (<b>Изменения сохранены</b>)
          });
        };
      })
      .catch((err) => {
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  render() {
    const form = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Название бота" className="app-form-field">
            {form.getFieldDecorator('name', {
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Приветственное сообщение" className="app-form-field">
            {form.getFieldDecorator('initialMessage', {
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ]
            })(
              <Input.TextArea placeholder="Здравствуйте, ..." autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
        </div>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  const project = props.project;
  if (project) {
    return {
      name: Form.createFormField({
        value: project.bot.name
      }),
      initialMessage: Form.createFormField({
        value: project.bot.initialMessage
      })
    }
  }
}

export default Form.create({ name: 'editBotBasic', mapPropsToFields })(EditBotBasicForm);