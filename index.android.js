/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  Animated,
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
      case "kicker":      return (<Kicker data={article}/>);
      case "small":       return (<Small data={article}/>);
      case "byline_date": return (<BylineDate data={article}/>);
      case "blockquote":  return (<BlockQuote data={article}/>);
      case "pullquote":   return (<PullQuote data={article}/>);
      case "image":       return (<ImageObj data={article}/>);
      case "moving_image": return (<ImageMoving data={article}/>);
      case "video":       return (<VideoObj data={article}/>);
      case "audio":       return (<Audio data={article}/>);
     default:            return (<Text data={article}>mydefault</Text>);
    }
  }
}

class Paragraph extends Component {
  render() {

    if(typeof (this.props.data.formats) === "object") {
      return (
        <Text style={styles.paragraphFormat}>{this.props.data.text}</Text>
      );
    }

    return (
      <Text style={styles.paragraph}>{this.props.data.text}</Text>
    );
  }
}

class Heading1 extends Component {
  render() {
    return (
      <Text
        style={styles.h1}>{this.props.data.text}
      </Text>
    );
  }
}

class Heading2 extends Component {
  render() {
    return (
      <Text
        style={styles.h2}>
        {this.props.data.text}
      </Text>
    );
  }
}

class Heading3 extends Component {
  render() {
    return (
      <Text
        style={styles.h3}>
        {this.props.data.text}
      </Text>
    );
  }
}

class Heading4 extends Component {
  render() {
    return (
      <Text
        style={styles.h4}>{this.props.data.text}</Text>
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

class Small extends Component {
  render() {
    return (
      <Text style={styles.small}>{this.props.data.text}</Text>
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
        <Text style={styles.byline}>
            <Text>{bylines.label}</Text>
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
      <Text style={styles.blockQuote}>{this.props.data.text}</Text>
    );
  }
}

class PullQuote extends Component {
  render() {
    return (
      <Text style={styles.pullQuote}>{this.props.data.text}</Text>
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

class ImageMoving extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: this.props.data.sources.video_144p_mp4.url}}
          resizeMode="cover"
          style={{width: 424, height: 240}}/>
          <Caption data={this.props.data.caption}/>
        <Credit data={this.props.data.credit}/>
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
          resizeMode="cover"
          style={{width: 424, height: 240}}/>
        <Text style={styles.summary}>{this.props.data.summary}</Text>
        <Caption data={this.props.data.caption}/>
        <Credit data={this.props.data.credit}/>
      </View>
    );
  }
}

class Audio extends Component {
  render() {
    return (
      <View style={styles.audio}>
        <Text style={styles.h3}>{this.props.data.title} </Text>
        <Credit data={this.props.data.credit}/>
      </View>
    );
  }
}

class Caption extends Component {
  render() {
    return (
      <Text style={styles.capt}>{this.props.data} </Text>
    );
  }
}

class Credit extends Component {
  render() {
    return (
      <Text style={styles.credit}> {this.props.data} </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 18,
  },
  paragraph: {
    fontFamily: 'NYTCheMedReg',
    fontSize: 18,
    marginBottom: 10,

  },
  paragraphFormat: {
    fontFamily: 'NYTCheWidIta',
    fontSize: 18,
    marginBottom: 10,
    color: 'black'
  },
  h1: {
    fontFamily: 'NYTCheBolReg',
    fontSize: 30,
    color: 'black',
    marginBottom: 35,
  },
  h2: {
    fontFamily: 'NYTCheMedReg',
    fontSize: 30,
    color: 'black',
    marginBottom: 35,
  },
  h3: {
    fontFamily: 'NYTCheBolReg',
    fontSize: 22,
    color: 'black',
    marginBottom: 35,
  },
  h4: {
    fontSize: 18,
    fontFamily: "NYTCheBolReg",
    marginBottom: 35,
    color: 'black'
  },
  kicker: {
    fontSize: 13,
    fontFamily: "NYTFraMed",
    color: 'black',
    marginBottom: 5,
  },
  small: {
    fontSize: 14,
    fontFamily: "NYTFraMed",
    color: 'black',
    marginBottom: 18,
  },
  byline: {
    fontSize: 11,
    fontFamily: 'NYTCheBolReg',
    color: 'black'
  },
  bylineDate: {
    fontFamily: 'NYTCheMedReg',
    fontSize: 13,
    color: 'black',
    marginBottom: 18
  },
  capt: {
    fontSize: 13,
    fontFamily: 'NYTFraMed',
    color: 'black'
  },
  credit: {
    color: '#999',
    fontSize: 11,
    fontFamily: 'NYTFraMed',
  },
  blockQuote: {
    fontFamily: 'NYTCheWidIta',
    fontSize: 18,
    color: 'black',
    marginBottom: 10
  },
  pullQuote: {
    fontFamily: 'NYTCheBolRega',
    fontSize: 38,
    color: 'black',
    marginBottom: 36,
    marginTop: 36
  },
  summary: {
    fontSize: 13,
    fontFamily: 'NYTCheMedReg'
  },

  audio: {
    marginBottom: 30
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 100,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
