
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';


export default class App extends Component {

  // url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=8488cba818a44e7c81c45cac2b4a9834";

  url = "https://newsapi.org/v2/top-headlines?apiKey=a12aa7b1ebe14779a452d5601d01048b";
  render() {
    return (
      <div>
        <Navbar />
        <Routes>
          {/* <Route exact path="/about" element={<About mode={mode}/>} /> */}

          {/* pass a unique 'key' paramenter to tell the <News> to remount/rerender the component when every you hit this urls (here click categories in navbar link)  */}
          <Route exact path="/" element={<News key="general" pageSize={10} url={this.url} country="in" category="general" />} />
          <Route exact path="/business" element={<News key="business" pageSize={10} url={this.url} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={10} url={this.url} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News key="general" pageSize={10} url={this.url} country="in" category="general" />} />
          <Route exact path="/health" element={<News key="health" pageSize={10} url={this.url} country="in" category="health" />} />
          <Route exact path="/science" element={<News key="science" pageSize={10} url={this.url} country="in" category="science" />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={10} url={this.url} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={10} url={this.url} country="in" category="technology " />} />

          {/* <News pageSize={10} url={this.url} country="in" category="sports" /> */}
        </Routes>
      </div>

    )
  }
}
