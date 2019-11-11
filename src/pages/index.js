import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import About from '../components/About';
import ContactForm from '../components/ContactForm';
// import PostList from '../components/PostList';
// import Photo from '../components/Photo'

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      mouseDown: false,
      hue: 340,
      lightness: 52,
    };
  }

  handleMouseDown(e) {
    if (!e.target.matches(`body`)) {
      this.setState({ mouseDown: true });
      document.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseUp() {
    this.setState({ mouseDown: false });
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    const hueIncrement = window.innerHeight / 360;
    const mouseYPositionPercent = (e.clientY / window.innerHeight) * 100;
    const hue = mouseYPositionPercent * hueIncrement;
    const lightness = (e.clientX / window.innerHeight) * 100;

    this.setState({ hue, lightness });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { data } = this.props;

    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout>
        <Helmet titleTemplate={`${siteTitle}`} defaultTitle={siteTitle}>
          <style>{`
          :root {
            --primary-hue: ${this.state.hue};
            --primary-lightness: ${this.state.lightness}%;
            -webkit-user-select: ${this.state.mouseDown ? 'none' : 'auto'};
              -moz-user-select: ${this.state.mouseDown ? 'none' : 'auto'};
              user-select: ${this.state.mouseDown ? 'none' : 'auto'};
          }
        `}</style>
        </Helmet>
        <main className="grid-container">
          <h1>{siteTitle}</h1>
        </main>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
