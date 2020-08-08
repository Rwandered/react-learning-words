import React, {Component} from 'react'
import Card from '../Card/Card'
import ReactSlider from '../Slider/Slider'
import FirebaseContext from "../../context/firebaseContext";
import {connect} from 'react-redux'
import s from './Content.module.scss'
import {bindActionCreators} from "redux";
import {fetchCardsFromDb} from "../../redux/actions/actions";


class Content extends Component {

  componentDidMount() {
    console.log('COMPONENT CONTENT')
    const { fetchCardsFromDb }= this.props

    const { getUserCardsRef } = this.context

    fetchCardsFromDb(getUserCardsRef)
  }

  componentWillUnmount() {
    const { getUserCardsRef } = this.context
    getUserCardsRef().off()
  }


  render() {

    const { items } = this.props
    // console.log('items: ', items )

    return (
      <>
        <div className={s.cover}>
          <div className={s.wrapper}>
            <div>
              <ReactSlider/>
            </div>
            <div className={s.cardContainer}>
              {
                items
                  .map( ( {eng, rus, id, ...props } ) => (
                      <Card
                        key={id}
                        eng={eng}
                        rus={rus}
                        id = {id}
                        {...props}
                      />
                    )
                  )
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

Content.contextType = FirebaseContext

const mapStateToProps = state => {
  return {
    items: state.cards.cardsArray || []
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( {
    fetchCardsFromDb
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Content)