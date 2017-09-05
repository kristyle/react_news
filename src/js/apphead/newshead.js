/**
 * Created by lengye on 2017/9/1.
 */
import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import logo from '../../images/logo.png'

import {
    Row,
    Col,
    Menu,
    Modal,
    Icon,
    Button,
    Tabs,
    Form,
    Input,
    message
} from 'antd'
const MenuItem = Menu.Item
const TabPane = Tabs.TabPane
const FormItem = Form.Item

class Newshead extends Component{
    state={
        username :null,
        flag:false
    }
    componentDidMount(){
        const username = localStorage.getItem('username')
        if (username){
            this.setState({username})
        }
    }
    tuichu = ()=>{
        this.setState({username:null})
        localStorage.removeItem('username')
        localStorage.removeItem('userID')

    }
    changeFlag = (flag) => {
        this.setState({flag:flag})
    }
    clickchange=({key}) =>{
        if (key === 'logout'){
            this.setState({flag:true})
        }
    }
    handleSubmit = (isLogin)=>{
        const {username,password,r_userName,r_password,r_confirmPassword} = this.props.form.getFieldsValue()
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
        if (isLogin){
            url+=`action=login&username=${username}&password=${password}`
        }else {
            url+=`action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        }
        axios.get(url)
            .then(response =>{
                const result =response.data
                if (isLogin){
                    if(result){
                        message.success('登陆成功')
                        let username = result.NickUserName
                        let userID = result.UserId
                        this.setState({username})
                        localStorage.setItem('username',username)
                        localStorage.setItem('userID',userID)
                    }else {
                        message.error('登陆失败请重新登陆')
                    }


                }else{
                    message.success('注册成功')
                }

                this.setState({flag:false})
            })



    }
    handleChange =()=>{
        this.props.form.resetFields()
    }
    render(){
        const {username,flag} = this.state
        const userShow = username ?(
            <MenuItem key="login" className="register">
                <Button type='primary'>{username}</Button>
                <Link to='/news_user'><Button type='Dashed'>个人中心</Button></Link>
                <Button type='Default' onClick={this.tuichu}>退出</Button>
            </MenuItem>
        ):(
            <MenuItem key="logout" className="register">
                <Icon type="appstore" onClick={()=>this.changeFlag(true)}/>登陆/注册
            </MenuItem>
        )


        const {getFieldDecorator} = this.props.form
        return(
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href="#/" className="logo">
                            <img src={logo} alt=""/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu mode="horizontal" defaultSelectedKeys={['top']} onClick={this.clickchange}>
                            <MenuItem key="top">
                                <Icon type="appstore"/>头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {userShow}
                        </Menu>
                        <Modal title='用户中心' visible={flag} onOk={this.changeFlag.bind(this,false)} onCancel={this.changeFlag.bind(this,false)}
                        okText='关闭'>
                            <Tabs type="card" onChange={this.handleChange}>
                                <TabPane tab="登陆" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label='用户名'>
                                            {
                                                getFieldDecorator('username')(
                                                    <Input type='text'/>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {
                                                getFieldDecorator('password')(
                                                    <Input type='password'/>
                                                )
                                            }
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>登陆</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                        <FormItem label='用户'>
                                            {
                                                getFieldDecorator('r_userName')(
                                                    <Input type='text'/>
                                                )
                                            }


                                        </FormItem>
                                        <FormItem label='密码'>
                                            {
                                                getFieldDecorator('r_password')(
                                                    <Input type='password'/>
                                                )
                                            }

                                        </FormItem>
                                        <FormItem label='确认密码'>
                                            {
                                                getFieldDecorator('r_confirmPassword')(
                                                    <Input type='password'/>
                                                )
                                            }

                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>

                    </Col>
                    <Col span={1}></Col>
                </Row>


            </header>
        )
    }
}
export default Form.create()(Newshead)