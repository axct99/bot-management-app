import React from 'react'
import axios from 'axios'
import { Divider, Drawer, Form, Input, Select, Modal, Button } from 'antd'

class AddAnswerDrawer extends React.Component {
  state = {
    loading: false
  }

  showLoading () {
    this.setState({ loading: true })
  }

  hideLoading () {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 500)
  }

  async send (data) {
    this.showLoading()

    // fake request
    const answer = {
      id: 1,
      title: 'Заголовок вопроса',
      content: 'Ответ на вопрос...',
      tags: [
        'Тег #1',
        'Тег #2',
        'Тег #3'
      ]
    }
    this.props.list.addOne(answer)
    this.props.close()
    this.props.form.resetFields()

    // axios.post(
    //   config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/', {
    //     answer: data
    //   })
    //   .then((res) => {
    //     if (res.data.error) {
    //       Modal.error({
    //         title: 'Ошибка',
    //         content: res.data.error.message
    //       });
    //     } else if (res.data.answer) {
    //       this.props.list.addOne(res.data.answer);
    //       this.props.close();
    //       setTimeout(() => {
    //         this.props.form.resetFields();
    //       }, 1000);
    //     };
    //   })
    //   .catch((err) => {
    //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
    //   })
    //   .finally(() => this.hideLoading());
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data)
    })
  }

  render () {
    const form = this.props.form
    return (
      <Drawer
        title={(<b>Добавить ответ</b>)}
        width='400'
        placement='right'
        onClose={this.props.close}
        visible={this.props.visible}
      >
        <Form hideRequiredMark='false' onSubmit={this.handleSubmit} className='app-form' layout='vertical'>
          <div className='app-form-fields'>
            <Form.Item label='Заголовок' className='app-form-field'>
              {form.getFieldDecorator('title', {
                rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label='Сообщение' className='app-form-field'>
              {form.getFieldDecorator('content', {
                rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
              })(
                <Input.TextArea autosize={{ minRows: 5 }} />
              )}
            </Form.Item>
            <Form.Item label='Теги' className='app-form-field'>
              {form.getFieldDecorator('tags')(
                <Select dropdownStyle={{ display: 'none' }} mode='tags' style={{ width: '100%' }} />
              )}
            </Form.Item>
          </div>
          <div className='app-form-btns'>
            <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit'>Добавить</Button>
          </div>
        </Form>
      </Drawer>
    )
  }
}

export default Form.create({ name: 'addAnswer' })(AddAnswerDrawer)
