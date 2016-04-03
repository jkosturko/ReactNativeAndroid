/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Video from 'react-native-video';


var REQUEST_URL = 'http://cms-article-schema.s3.amazonaws.com/papi/2015/01/01/us/test-superarticle.html';

class AwesomeProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();

  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.result.article.body_json),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }


    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderArticle}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Articles ...
        </Text>
      </View>
    );
  }

  renderArticle(article) {


    switch (article.type) {




      case "paragraph":   return (<Paragraph data={article}/>);
      case "heading1":    return (<Heading1 data={article}/>);
      case "heading2":    return (<Heading2 data={article}/>);
      case "heading3":    return (<Heading3 data={article}/>);
      case "heading4":    return (<Heading4 data={article}/>);
      case "heading5":    return (<Heading5 data={article}/>);
      case "kicker":      return (<Kicker data={article}/>);
      case "byline_date": return (<BylineDate data={article}/>);
      case "blockquote":  return (<BlockQuote data={article}/>);
      case "pullquote":   return (<PullQuote data={article}/>);
      case "image":       return (<ImageObj data={article}/>);
      case "video":       return (<VideoObj data={article}/>);
      case "audio":       return (<Audio data={article}/>);
     default:            return (<Text data={article}>mydefault</Text>);
    }

  }
}

class Paragraph extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.data.text}
        </Text>
        </View>
    );
  }
}

class Heading1 extends Component {
  render() {
    return (
      <Text style={styles.h1}>{this.props.data.text}</Text>
    );
  }
}

class Heading2 extends Component {
  render() {
    return (
      <Text style={styles.h2}>{this.props.data.text}</Text>
    );
  }
}

class Heading3 extends Component {
  render() {
    return (
      <Text style={styles.h3}>{this.props.data.text}</Text>
    );
  }
}

class Heading4 extends Component {
  render() {
    return (
      <Text style={styles.h4}>{this.props.data.text}</Text>
    );
  }
}


class Heading5 extends Component {
  render() {
    return (
      <Text style={styles.h5}>{this.props.data.text}</Text>
    );
  }
}

class Kicker extends Component {
  render() {
    return (
      <Text style={styles.kicker}>{this.props.data.text}</Text>
    );
  }
}


class BylineDate extends Component {
  render() {

    var bylineNodes = this.props.data.bylines.map(function(bylines) {
      var authorNodes = bylines.authors.map(function(author) {
        return(
          <Text> {author.uppercase} </Text>
        );
      });

      return (
        <Text >
          <Text style={styles.byline}>{bylines.label}</Text>
          {authorNodes}
        </Text>
      );
    });

    return (
      <View style={styles.container}>
        <Text>
          {bylineNodes}
          <Text style={styles.bylineDate}>{this.props.data.date.text}</Text>
        </Text>
      </View>
    );
  }
}

class BlockQuote extends Component {
  render() {
    return (
      <TextUnit data={this.props.data.text}/>
    );
  }
}

class PullQuote extends Component {
  render() {
    return (
      <TextUnit data={this.props.data.text}/>
    );
  }
}

class ImageObj extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.data.sources.articleLarge.url}}
          style={{width: this.props.data.sources.articleLarge.width, height: this.props.data.sources.articleLarge.height}}/>
          <Text>
            <Caption data={this.props.data.caption}/>
            <Credit data={this.props.data.credit}/>
          </Text>
      </View>
    );
  }
}

class VideoObj extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: this.props.data.sources.video_240p_mp4.url}}
          style={{width: 1000, height: this.props.data.sources.video_240p_mp4.height}}/>
        <Text>{this.props.data.type}</Text>
        <Text>{this.props.data.summary}</Text>
        <Caption data={this.props.data.caption}/>
        <Credit data={this.props.data.credit}/>
      </View>
    );
  }
}

class Audio extends Component {
  render() {
    return (
        <Credit data={this.props.data.credit}/>
    );
  }
}

class Caption extends Component {
  render() {
    return (
      <Text>{this.props.data} </Text>
    );
  }
}

class Credit extends Component {
  render() {
    return (
      <Text> {this.props.data} </Text>
    );
  }
}


class TextUnit extends Component {
  render() {
    return (
      <Text style={styles.h1}>{this.props.copy}</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    marginBottom: 18,
  },
  h1: {
    fontSize: 34,
    fontWeight: "700",
    fontFamily: "nyt-cheltenham,georgia,times new roman,times,serif",
    marginBottom: 36,
  },
  h2: {
    fontSize: 30,
    fontWeight: "300",
    fontFamily: "nyt-cheltenham, georgia, serif",
    marginBottom: 18,
  },
  h3: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "nyt-cheltenham, georgia, serif",
    marginBottom: 18,
  },
  h4: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "nyt-cheltenham, georgia, serif",
    marginBottom: 18,
  },
  h5: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "nyt-cheltenham, georgia, serif",
    marginBottom: 18,
  },
  kicker: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "nyt-cheltenham, georgia, serif",
    marginBottom: 18,
  },
  paragraph: {
    fontStyle: 'italic'
  },
  byline: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "nyt-cheltenham-sh,georgia,times new roman,times,serif"
  },
  bylineDate: {
    fontWeight: "300",
    fontFamily: "nyt-cheltenham-sh,georgia,times new roman,times,serif",
    marginBottom: 18
  },
  caption: {
    fontSize: 13,
    fontWeight: "300",
    fontFamily: "nyt-cheltenham-sh,georgia,times new roman,times,serif",
  },
  credit: {
    color: '#999',
    fontSize: 11,
    fontWeight: "300",
    fontFamily: "nyt-cheltenham-sh,georgia,times new roman,times,serif",
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center'
  },
  logo: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
