/**
 * Created by lengye on 2017/9/1.
 */
import React from 'react'
import {render} from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import MediaQuery from 'react-responsive'
import App from './js/App'
import NewsUser from './js/news_user'
import NewsMain from './js/news_main'
import NewsDetail from './js/news_detail'
import MobileApp from './js/mobile/MobileApp'
import MobileNewsContainer from './js/mobile/MobileNewsContainer'

import './pc.css'
import './mobile.css'

render((
    <div>
        <MediaQuery query='(min-device-width:1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={NewsMain}></IndexRoute>
                    <Route path='/news_detail/:uniquekey/:type' component={NewsDetail}/>
                    <Route path="/news_user" component={NewsUser}></Route>
                </Route>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
            <Router history={hashHistory}>
                 <Route path='/' component={MobileApp}>
                    <IndexRoute component={MobileNewsContainer}/>
                </Route>
            </Router>
        </MediaQuery>
    </div>

),document.getElementById('root'))
