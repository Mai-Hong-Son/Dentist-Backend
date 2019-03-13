import React from 'react';
import { connect } from 'react-redux';
import Image from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import OptionButton from './OptionButton';
import GenericModal from './GenericModal/index';
import CustomIcon from '../elements/Icon/CustomIcon';
import { t, dispatchAsync } from '../utils/common';
import { iconsMap } from '../utils/AppIcons';
import Loading from '../elements/Loading/index';
import { fetchGalleryDetail } from '../store/actions/gallery';
import platform from '../theme/variables/platform';

const styles = StyleSheet.create({
  selection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: -5
  },
  flex: {
    flex: 1,
    marginHorizontal: 5
  },
  imgSelection: {
    flexDirection: 'row'
  }
});

export const RadioSelection = ({ style, items, value, onChange }) => (
  <View style={[styles.selection, style]}>
    {items.map(({ title, id }) => (
      <OptionButton
        key={id}
        caption={title}
        highlight={value === id}
        onPress={() => onChange(id)}
        style={styles.flex}
      />
    ))}
  </View>
);

export const MultiSelection = ({ style, items, value, onChange, ...args }) => (
  <View style={[styles.selection, style]}>
    {items.map(({ title, id }) => (
      <OptionButton
        key={id}
        style={styles.flex}
        caption={title}
        highlight={value ? value.indexOf(id) > -1 : false}
        onPress={() => {
          const selections = value ? [...value] : [];
          const position = selections.indexOf(id);

          if (position === -1) {
            selections.push(id);
          } else {
            selections.splice(position, 1);
          }

          onChange(selections);
        }}
      />
    ))}
  </View>
);

@connect(
  null,
  dispatch => ({ dispatchAsync: dispatchAsync(dispatch) })
)
export class LibrarySelection extends React.Component {
  async onSelection(item) {
    this.props.input.onChange(item.id);
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props);
    if (props.input.value !== state.value) {
      return {
        value: props.input.value,
        needRefresh: true
      };
    }

    return false;
  }

  state = {
    needRefresh: false,
    value: null,
    before_url: null,
    after_url: null
  };

  componentDidUpdate() {
    if (this.state.needRefresh) {
      this.setState(
        {
          loading: true,
          needRefresh: false
        },
        async () => {
          await this.fetchData();
          this.setState({
            loading: false
          });
        }
      );
    }
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

  async fetchData() {
    try {
      if (this.state.value) {
        const item = await this.props.dispatchAsync(
          fetchGalleryDetail(this.state.value)
        );
        this.state.value = item.id;
        this.state.before_url = item.image_before_url;
        this.state.after_url = item.image_after_url;
      }
    } catch (e) {
      // ...
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.imgSelection}>
          <TouchableOpacity
            style={{
              flexDirection: 'row'
            }}
            onPress={() =>
              Navigation.showModal({
                screen: 'library',
                passProps: {
                  service_issue_id: this.props.service_issue_id,
                  onSelection: this.onSelection.bind(this)
                },
                navigatorButtons: {
                  leftButtons: [
                    {
                      title: t('library.back'), // for a textual button, provide the button title (label)
                      id: 'library_back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                      icon: iconsMap['arrow_back--nav']
                    }
                  ]
                }
              })
            }
          >
            <GenericModal
              style={{
                width: 70,
                height: 70,
                alignItems: 'center',
                marginRight: 10
              }}
            >
              {this.state.loading ? (
                <Loading />
              ) : this.state.before_url ? (
                <Image
                  style={{
                    width: 70,
                    height: 70
                  }}
                  source={{
                    uri: this.state.before_url
                  }}
                  resizeMode={Image.resizeMode.cover}
                />
              ) : (
                <CustomIcon
                  name="tooth_search"
                  style={{
                    fontSize: 42,
                    color: platform.primaryColor
                  }}
                />
              )}
            </GenericModal>

            <GenericModal
              style={{
                width: 70,
                height: 70,
                alignItems: 'center',
                marginRight: 10
              }}
            >
              {this.state.loading ? (
                <Loading />
              ) : this.state.after_url ? (
                <Image
                  style={{
                    width: 70,
                    height: 70
                  }}
                  source={{
                    uri: this.state.after_url
                  }}
                  resizeMode={Image.resizeMode.cover}
                />
              ) : (
                <CustomIcon
                  name="tooth_search"
                  style={{
                    fontSize: 42,
                    color: platform.primaryColor
                  }}
                />
              )}
            </GenericModal>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
