import React from 'react'
import { Form, Button, DatePicker, Input, Switch, Row, Col, Select} from 'antd';

const Option = Select.Option;
    
class Index extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, Values) => {
            if (!err) {
                this.props.onSubmit(Values);
            }

        });
    }

    handleReset = () => {
        this.props.form.resetFields();
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
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="住院号" >
                    {getFieldDecorator('Patientno')(
                        <Input placeholder="住院号" />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="病人姓名" >
                    {getFieldDecorator('Patientname', {
                        rules: [{ required: true, message: '请输入病人姓名!' }],
                    })(
                            <Input placeholder="病人姓名" />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="病人性别" >
                    {getFieldDecorator('SexString')(
                        <Select>
                          <Option value="男">男</Option>
                          <Option value="女">女</Option>
                        </Select>
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="出生年月" >
                    {getFieldDecorator('Patientbirth')(
                        <Input placeholder="出生年月" />
                    )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="入院日期" >
                    {getFieldDecorator('In_date')(
                        <DatePicker />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="出院日期" >
                    {getFieldDecorator('Out_date')(
                        <DatePicker />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="是否在院" >
                    {getFieldDecorator('inhospital', {
                        initialValue: false,
                    })(
                        <Switch />
                    )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="科室" >
                    {getFieldDecorator('depatid')(
                        <Select>
                          <Option value="1">重症医学科1</Option>
                          <Option value="2">重症医学科2</Option>
                        </Select>
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="病人分类" >
                    {getFieldDecorator('Diseaseclassification')(
                        <Select>
                          <Option value="1">难免压疮</Option>
                          <Option value="2">院前压疮</Option>
                          <Option value="3">普通病人</Option>
                          <Option value="4">院内压疮</Option>
                          <Option value="5">难免转院内</Option>
                        </Select>
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item {...formItemLayout} label="床位号" >
                    {getFieldDecorator('Bedno')(
                        <Input placeholder="床位号" />
                    )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12} style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit" style={{background: '#1890ff'}}>搜索</Button>
                </Col>
                <Col span={12} style={{textAlign: 'left'}}>
                    <Button onClick={this.handleReset}>重置</Button>
                </Col>
            </Row>
        </Form>
        );
    }
}

export default Form.create()(Index);