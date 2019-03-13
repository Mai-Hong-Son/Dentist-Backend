import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Image from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation';
import GenericModal from '../../components/GenericModal/index';
import platform from '../../theme/variables/platform';
import Divider from '../../elements/Divider/index';
import { dispatchAsync, t } from '../../utils/common';
import Scale from '../../utils/Scale';
import SafeArea from '../../components/SafeArea';
import Loading from '../../elements/Loading/index';
import { fetchGallery, fetchGalleryDetail } from '../../store/actions/gallery';
import { BtnClose } from '../../elements/Close/index';

@connect(
  null,
  dispatch => ({ dispatchAsync: dispatchAsync(dispatch) })
)
export default class PreviewSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      needRefresh: true,
      items: []
    };
  }

  async componentDidMount() {
    if (this.state.needRefresh) {
      this.state.needRefresh = false;
      await this.fetchData();
      this.setState({
        loading: false
      });
    }
  }

  async componentDidUpdate() {
    if (this.state.needRefresh) {
      await this.fetchData();
      this.setState({
        loading: false,
        needRefresh: false
      });
    }
  }

  onItemPress = item => async () => {
    const result = await this.props.onSelection(item);
    if (!result) {
      Navigation.dismissLightBox();
    }
  };
  async fetchData() {
    try {
      const preview = await this.props.dispatchAsync(fetchGallery());
      this.state.items = preview.items;
      // console.log('=========================================');
      // console.log('check', preview);
      // console.log('=========================================');
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <GenericModal>
          <Loading />
        </GenericModal>
      );
    }

    return (
      <GenericModal style={styles.container}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => Navigation.dismissLightBox()}
        >
          <BtnClose />
        </TouchableOpacity>

        <FlatList
          refreshing={this.state.refreshing}
          contentContainerStyle={styles.listView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          data={this.state.items}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.des}>{item.des}</Text>

              <TouchableOpacity
                style={styles.imageContainer}
                onPress={this.onItemPress(item)}
              >
                <GenericModal style={{ marginRight: 10 }}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image_before_url }}
                    resizeMode={Image.resizeMode.cover}
                  />
                </GenericModal>
                <GenericModal>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image_after_url }}
                    resizeMode={Image.resizeMode.cover}
                  />
                </GenericModal>
              </TouchableOpacity>
              <Divider style={{ marginTop: 20 }} />
            </View>
          )}
        />
      </GenericModal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: platform.deviceWidth * 0.9,
    height: platform.deviceHeight * 0.8,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  closeBtn: {
    alignItems: 'flex-end'
  },
  listView: {
    // alignItems: 'center'
    paddingTop: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: platform.titleFontColor,
    paddingBottom: 8
  },
  des: {
    fontSize: 14,
    fontWeight: '400',
    color: platform.subtitleColor
  },
  itemContainer: {
    paddingBottom: 20
  },
  image: {
    width: Scale.getSize(100),
    height: Scale.getSize(100)
  },
  imageContainer: {
    flexDirection: 'row',
    paddingTop: 10
  }
});
