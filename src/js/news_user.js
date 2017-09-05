//用户中心路由组件
import React, {Component} from 'react'
import {Row,Col,Tabs,Card,Upload,Icon,Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
const TabPane = Tabs.TabPane;


export default class UserCenter extends Component {

    //初始化数据
    state={
        collections:'',
        comments:'',
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }


    componentDidMount() {
        const userId = localStorage.getItem('userID')
        console.log(userId)
        //接收收藏的新闻
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        //发送ajax请求
        axios.get(url)
            .then(response => {
                    const collections = response.data
                    //更新数据
                    this.setState({collections})
                }
            )

        //评论列表
        url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response=>{
                const comments=response.data
                this.setState({comments})
            })
    }


        //头像
    handleCancel = () => this.setState({ previewVisible: false })

    // 显示预览图片(显示 modal)
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    // 选择上传图片
    handleChange = ({ fileList }) => this.setState({ fileList })





        render() {

            const {collections,comments}=this.state
            //获取收藏列表
            const collectionList=!collections
                ?<h3>没有任何收藏，立即去收藏文章</h3>
                :collections.map((collection,index)=>(
                    <Card key={index} title={collection.uniquekey} extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
                    {collection.Title}
                    </Card>
                ))
            //获取评论列表
            const commontList=!comments
                ?<h3>没有任何评论</h3>
                :comments.map((comment,index)=>(
                    <Card key={index} title={`于${comment.datetime}评论了文章${comment.uniquekey}`}
                          extra={<Link to={`/news_detaiCl/${comment.uniquekey}/top`}>查看</Link>}>
                        {comment.omments}
                    </Card>
                ))

            //头像设置
            const { previewVisible, previewImage, fileList } = this.state;
            const uploadButton = (
                <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                </div>
            )

            return (
                <div>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Tabs >
                                <TabPane key="1" tab="我的收藏列表">
                                    {collectionList}
                                </TabPane>
                                <TabPane key="2" tab="我的评论列表">
                                    {commontList}
                                </TabPane>
                                <TabPane key="3" tab="头像设置">
                                    <div className="clearfix">
                                        <Upload
                                           action='http://jsonplaceholder.typicode.com/photos'
                                           listType="picture-card"
                                           fileList={fileList}
                                           onPreview={this.handlePreview}
                                           onChange={this.handleChange}>
                                            {fileList.length >= 3 ? null : uploadButton}
                                        ></Upload>
                                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </div>
            )
        }
    }
