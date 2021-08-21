import React from 'react';
import { View , Text} from 'react-native';
import axios from 'axios';
import { Card, Item } from 'react-native-elements';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Details: {},
      Image: {},
      url: `http://localhost:5000/planet?name=${this.props.navigation.getParam("planet_name")}`
  }
}
  componentDidMount(){
    this.getDetails();
  }

  getDetails = () => {
    const{url} = this.state
    axios
    .get(url)
    .then(response => {
      this.setDetails(response.data.data)
    })
    .catch((error) => {
      Alert.error(error.message)
    })
  }

  setDetails = planet_details => {
    const planet_type = planet_details.planet_type
    let image_path = ''
    switch(planet_type) {
      case 'gas_giant':
        image_path = require('../assets/gas_giant.png')
      break
      case 'neptune_like':
        image_path = require('../assets/neptune_like.png')
      break
      case 'super_earth':
        image_path = require('../assets/super_earth.png')
      break
      case 'terrestrial':
        image_path = require('../assets/terrestrial.png')
      break
      default:
        image_path = require('../assets/gas_giant.png')
      break
    }
    this.setState({
      details: planet_details,
      image_path: image_path,
    })
  }
  render(){
    const {details, image_path} = this.state()
    if (details.specification){
      return(
          <View style={styles.container}>
            <Card title={details.name} image={image_path} image_props={{resizeMode: 'contain'}, width: 100% height: 100%}>
              <View>
                <Text style={styles.cardItem}>{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                <Text style={styles.cardItem}>{`Distance from Sun : ${details.distance_from_sun}`}</Text>
                <Text style={styles.cardItem}>{`Gravity : ${details.gravity}`}</Text>
                <Text style={styles.cardItem}>{`Orbital period : ${details.orbital_period}`}</Text>
                <Text style={styles.cardItem}>{`Orbital speed : ${details.orbital_speed}`}</Text>
                <Text style={styles.cardItem}>{`Planet radius : ${details.planet_radius}`}</Text>
                <Text style={styles.cardItem}>{`Planet mass : ${details.planet_mass}`}</Text>
                <Text style={styles.cardItem}>{`Planet type : ${details.planet_type}`}</Text>        
              </View>
              <View style ={[styles.cardItem, {flexDirection: 'column'}]}>
                <Text>
                {details.specification ? specification : ''}
                </Text>{details.specification.map((item, index) => (
                  <Text key={index.toString() style={{marginLeft: 50}}}>{item}</Text>
                ))}
              </View>
            </Card>
          </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({ 
  container: { flex: 1 }, 
  cardItem: { marginBottom: 10 } 
});