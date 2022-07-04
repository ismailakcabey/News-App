import { View, Text , Image , Linking , ScrollView , StyleSheet} from 'react-native'
import React , {Component} from 'react'
import {Card , Title , Paragraph , Appbar} from 'react-native-paper'
import Header from '../../components/AppBar'
import axios from 'axios'

export default class HomeScreen extends Component {
  state={
    articles:[],
    isLoading:true,
    errors:null,
  };

  getArticles(){
    axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=`${API_KEY}`")
    .then(response => response.data.articles.map(article => ({
        date:`${article.publishedAt}`,
        title:`${article.title}`,
        url:`${article.url}`,
        description:`${article.description}`,
        urlToImage:`${article.urlToImage}`,
        content : `${article.content}`,
    })))
    .then(articles=>{
        this.setState({
            articles,
            isLoading:true
        })
    })
  }
  componentDidMount(){
    this.getArticles();
  }
  render(){
    const {isLoading , articles} = this.state;
    return(
        <View style={{justifyContent:"center", alignItems:"center"}}>
           <ScrollView>
            <Appbar/>
            {isLoading ? (
                articles.map(article=>{
                    const {date , title , url , description , urlToImage , content} = article;
                    return(
                        <View>
                        <Card
                        key={url}
                        style={{marginTop:10,borderColor:"black" , borderRadius:5 , borderBottomWidth:1}}
                        onPress={()=>{Linking.openURL(`${url}`)}}
                        >
                            <View style={{flexDirection:"row"}}>
                                <View style={{justifyContent:"space-around" , flex:2/3 , margin:10}}>
                                    <Title style={styles.baslik}>{title}</Title>
                                </View>
                                <View style={{margin:10 , flex:1/3}}>
                                    <Image style={{width:120 , width:120 }} source={{uri:urlToImage}}/>
                                    <Image
                                        source={{ uri: `${urlToImage}` }}
                                        style={{ width: 120, height: 120 }}
                                    />
                                </View>
                            </View>
                            <View>
                                <Paragraph style={styles.aciklama}>
                                        {description}
                                </Paragraph>
                                <Text style={styles.tarih}>publishedAt : {date}</Text>
                            </View>
                        </Card>
                        </View>
                    )
                })
            ):(<Text style={{fontSize:50 , margin:80}}>Hata oldu</Text>)}
           </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    baslik:{
        color:"purple",
        fontWeight:"700",
        margin:10
    },
    aciklama:{
        color:"grey",
        fontWeight:"500",
        margin:10,
    },
    tarih:{
        color:"black",
        fontWeight:"400",
        margin:10
    },
  });