import React from 'react'
import { Form, Button, DatePicker, Input, Switch} from 'antd';
    
class Index extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, Values) => {
            if (!err) {
                this.props.onSubmit(Values);
            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: '请输入搜索的病人!' }],
        };
        return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Item
                {...formItemLayout}
                label="病人姓名"
            >{getFieldDecorator('Patientname', {
                rules: [{ required: true, message: '请输入病人姓名!' }],
              })(
                    <Input placeholder="病人姓名" />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="床位号"
            >{getFieldDecorator('Bedno')(
                    <Input placeholder="床位号" />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="病号"
            >{getFieldDecorator('Patientno')(
                <Input placeholder="病号" />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="入院日期"
            >{getFieldDecorator('range-picker')(
                <DatePicker />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="是否出院"
            >{getFieldDecorator('range-time-picker', {
                initialValue: false,
            })(
                <Switch />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="出院日期"
            >
            {getFieldDecorator('time-picker')(
                <DatePicker />
            )}
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                }}
            >
                <Button type="primary" htmlType="submit" style={{background: '#1890ff'}}>Submit</Button>
            </Form.Item>
        </Form>
        );
    }
}

export default Form.create()(Index);