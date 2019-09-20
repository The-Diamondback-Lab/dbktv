// Packages
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Components
import { Slide } from '../templates'

/**
 * Component representing the slide deck
 *
 * @class Deck
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Deck extends Component {
  /**
   * Creates a new slide deck.
   *
   * @param {object} props - Component properties
   * @param {Function} props.error - Error handling function
   * @param {Function} props.fetch - Load handling function
   * @param {string} props.id - Id of current deck
   * @returns {Deck}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {number} state.count - Total # of slides in deck
     * @property {number} state.duration - Deck duration in ms
     * @property {boolean} state.paused - True if deck is paused
     * @property {number} state.position - ID of current slide. Defaults to -1
     * @property {object[]} state.slides - Slide content
     * @instance
     */
    this.state = {
      count: 0,
      duration: 0,
      position: -1,
      slides: null
    }
  }

  /**
   * Sanitizes the incoming deck data.
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming props
   * @param {object} state - Component state
   * @returns {object | null} Object to update the state, or null to update
   * nothing
   */
  static getDerivedStateFromProps(props, state) {
    const { slides } = props

    const count = slides.length
    const durations = slides.map(slide => slide.duration)

    return {
      count,
      duration: durations.reduce((total, value) => total + value),
      position: 0,
      slides: slides.map((slide, i) => {
        slide.state.id = slide.pathname
        slide.state.next = i === count - 1 ? `/slides/1` : `/slides/${i + 2}`
        return slide
      })
    }
  }

  /**
   * Renders a <main> element with the id 'deck' and the class name 'ado-deck'.
   * The deck slides will be rendered inside of the container.
   *
   * @returns {HTMLElement} <main id="deck" class="ado-deck">
   */
  render() {
    const { slides } = this.state

    return (
      <main id='deck' className='ado-deck'>
        <DeckSlides slides={slides} />
      </main>
    )
  }
}

/**
 * Renders a <div> element with the class 'deck-slides'.
 *
 * @param {object} param0 - Component properties
 * @param {object[]} param0.slides - Slide objects
 * @returns {HTMLDivElement} <div class="deck-slides">
 */
const DeckSlides = ({ slides }) => {
  return (
    <div className='deck-slides'>
      {slides.map((slide, i) => {
        return (
          <Route component={Slide} path={slide.pathname} key={slide.pathname} />
        )
      })}
    </div>
  )
}
