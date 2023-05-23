import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-content">
          <h1 className="main-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="card"
          />
        </div>
      </div>
    )
  }
}
export default Home
