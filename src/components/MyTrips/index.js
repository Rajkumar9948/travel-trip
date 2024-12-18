import {withRouter, Link} from 'react-router-dom'

import {FiHome} from 'react-icons/fi'
import {RiSuitcase2Line} from 'react-icons/ri'
import {TbLogout2} from 'react-icons/tb'
import Cookies from 'js-cookie'

import TravelTripContextValue from '../../context/TravelTripContextValue'

import './index.css'

const MyTrips = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <TravelTripContextValue.Consumer>
      {value => {
        const {myTripsList} = value
        const isCreatedList = myTripsList.length >= 1

        return (
          <div className="my-trips-container">
            <header className="nav-container">
              <nav className="lg-header-container">
                <h1 className="lg-header-heading">
                  <Link className="link-lg-item" to="/">
                    Travel Trip
                  </Link>
                </h1>

                <div className="lg-nav-list">
                  <div className="lg-nav-item">
                    <Link className="link-lg-item link-lg-home" to="/">
                      Home
                    </Link>
                    <Link className="link-icon link-sm-home" to="/">
                      <FiHome className="home-icon" />
                      <p className="home-header-text">Home</p>
                    </Link>
                  </div>
                  <div className="lg-nav-item">
                    <Link className="link-lg-item link-lg-home" to="/my-trips">
                      My Trips
                    </Link>
                    <Link className="link-icon link-sm-home" to="/my-trips">
                      <RiSuitcase2Line className="home-icon" />
                      <p className="home-header-text">My Trips</p>
                    </Link>
                  </div>
                  <div className="sm-btn-container">
                    <button
                      onClick={onClickLogoutButton}
                      type="button"
                      className="logout-button-sm link-icon"
                    >
                      <TbLogout2 className="home-icon" />
                      <p className="home-header-text">Logout</p>
                    </button>
                  </div>
                </div>

                <button
                  onClick={onClickLogoutButton}
                  type="button"
                  className="lg-logout-btn"
                >
                  Logout
                </button>
              </nav>
            </header>
            {!isCreatedList && (
              <div className="my-trips-content-container">
                <img
                  src="https://res.cloudinary.com/dsfextndf/image/upload/v1715695116/Vector_rjv87k.png"
                  alt="no trips"
                  className="no-trip-image"
                />
                <p className="no-trip-heading">No upcoming trips.</p>
                <p className="no-trip-description">
                  When you book a trip, you will see your trip details here.
                </p>
                <Link to="/book-a-new-trip">
                  <button className="no-trip-button" type="button">
                    Book a new trip
                  </button>
                </Link>
              </div>
            )}
            {isCreatedList && (
              <div className="trips-list-container">
                <h1 className="my-trips-heading">My Trips</h1>
                <ul className="my-trips-list-ul">
                  {myTripsList.map(eachTrip => (
                    <li className="my-trips-item-container" key={eachTrip.id}>
                      <h1 className="trip-item-heading">
                        {eachTrip.endLocation}
                      </h1>
                      <div>
                        <p className="date-text">Date</p>
                        <p className="date-to-text">{`${eachTrip.startDate} to ${eachTrip.endDate}`}</p>
                      </div>
                      <button type="button" className="trip-cancel-btn">
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      }}
    </TravelTripContextValue.Consumer>
  )
}

export default withRouter(MyTrips)
