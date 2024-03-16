import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {getCategory, getSubCategory} from '../api/apis';
import { ROUTES_SCREEN_NAME } from '../utils/RouterConstants';
import { images } from '../assets';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state: RootState) => state.category.categoryList,
  );
  const subCategoryList = useSelector(
    (state: RootState) => state.category.subCategoryList,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState<any>(1);

  useEffect(() => {
    dispatch(
      getCategory({
        CategoryId: 0,
        PageIndex: 1,
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getSubCategory({
        CategoryId: selectedCategory,
        PageIndex: page,
      }),
    );
  }, [selectedCategory,page]);

  const Item = (item: object) => (
    <View style={styles.itemStyle} key={item?.item?.Id}>
      <Text style={styles.title}>{item?.item?.Name}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          {item?.item?.Product.map(product => {
            return (
              <TouchableOpacity onPress={()=>props.navigation.navigate(ROUTES_SCREEN_NAME.STRIP)} key={product.Name} style={{marginHorizontal: 10}}>
                <ImageBackground
                  style={styles.imageStyle}
                  source={{uri: product?.ImageName}}>
                  <View style={styles.roundView}>
                    <Text style={styles.codeStyle}>{product.PriceCode}</Text>
                  </View>
                </ImageBackground>
                <Text style={styles.subCatTitle}>{product.Name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.headerStyle}>
        <Image source={images.filter} style={styles.iconStyle}></Image>
        <Image source={images.search} style={styles.iconStyle}></Image>
      </View>
      <View style={styles.scrollStyle}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {categoryList.map(category => {
              return (
                <TouchableOpacity
                  key={category.Name}
                  onPress={() => {setSelectedCategory(category.Id),setPage(1)}}>
                  <Text
                    style={[
                      styles.item,
                      {fontSize: selectedCategory === category.Id ? 20 : 15},
                    ]}>
                    {category.Name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <FlatList
        data={subCategoryList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerStyle: {height: 70, width: '100%',alignItems:'flex-end',justifyContent:'flex-end', backgroundColor: 'black',flexDirection:'row',},
  item: {
    fontSize: 15,
    marginTop: 5,
    color: 'white',
    marginHorizontal: 15,
  },
  scrollStyle: {height: 50, backgroundColor: 'black'},
  itemStyle: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 16,
    color: 'black',
    textTransform: 'uppercase',
  },
  subCatTitle: {
    fontSize: 10,
    marginTop: 5,
    color: 'gray',
  },
  codeStyle: {
    fontSize: 12,
    color: 'white',
    padding: 3,
  },
  imageStyle: {width: 100, height: 100, borderRadius: 15, overflow: 'hidden'},
  roundView: {
    borderRadius: 10,
    width: 50,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'cadetblue',
  },
  iconStyle:{width:20,height:20,tintColor:'white',marginHorizontal:10}
});

export default HomeScreen;
